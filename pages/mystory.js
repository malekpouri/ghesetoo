import TextAreComponent from '@/components/TextAreComponent'
import { useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import Head from 'next/head'
import { getSession, signOut, useSession } from 'next-auth/react'
import AccessDenied from './404'
import Avatar from '@/data/image/avatar.png'
import Image from 'next/image'
import axios from 'axios'

const mystory = () => {
  /* eslint-disable */
  const [errors, setErrors] = useState([])
  const [saveStoryState, setSaveStoryState] = useState(false)
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(1)
  const [changeProfilePicture, setChangeProfilePicture] = useState(false);
  const shortStoryRef = useRef(null)
  const whatWhereRef = useRef(null)
  const hardwareRef = useRef(null)
  const softwareRef = useRef(null)
  const whatYouWantRef = useRef(null)
  const jobTitleRef = useRef(null)
  const nicknameRef = useRef(null)

  const { data: session } = useSession()

  if (!session) {
    return <AccessDenied />
  }

  let schema = yup.object({
    nickname: yup.string().min(3, "اسمت رو بنویس"),
    jobTitle: yup.string().required("در چه حوزه ای فعالیت میکنی؟").min(4, "حوزه فعالیت باید بیشتر از ۴ حرف باشه"),
    profilePictureVal: yup.string().required("تصویر پروفایل انتخاب نشده").nullable(),
    shortStory: yup.string().min(50, "داستانت حد اقل باید ۵۰ کلمه باشد"),
    whatWhere: yup.string().min(50, "قسمت کجا و چیکار میکردی حد اقل باید ۵۰ کلمه باشه"),
    hardware: yup.string().min(50, "قسمت سخت افزار حد اقل باید ۵۰ کلمه باشه"),
    software: yup.string().min(50, "قسمت نرم افزار حد اقل باید ۵۰ کلمه باشه"),
    whatYouWant: yup.string().min(50, "قسمت میخواهی محیط کارت چطوری باشه اقل باید ۵۰ کلمه باشه"),

  })

  useEffect(() => {
    const response = fetch(process.env.public_url + `/api/getStoryByEmail?email=${session.user.email}`)
    response.then(res => res.json()).then(data => {
      if (data.nickname === null) {
        nicknameRef.current.value = data.name + " " + (data.family ? data.family : "")
      }else {
        nicknameRef.current.value = data.nickname
      }
      jobTitleRef.current.value = data.jobTitle
      shortStoryRef.current.value = data.shortStory
      whatWhereRef.current.value = data.whatWhere
      hardwareRef.current.value = data.hardware
      softwareRef.current.value = data.software
      whatYouWantRef.current.value = data.whatYouWant
      setImageUrl(data.profilePicture ? `${process.env.public_url}/api/getImageByName/`+data.profilePicture:null)
    })
  }, [])

  /* eslint-enable */
  async function validation(e) {
    try {
      const result = await schema.validate(
        {
          nickname: nicknameRef.current.value,
          jobTitle: jobTitleRef.current.value,
          shortStory: shortStoryRef.current.value,
          whatWhere: whatWhereRef.current.value,
          hardware: hardwareRef.current.value,
          software: softwareRef.current.value,
          whatYouWant: whatYouWantRef.current.value,
          profilePictureVal: imageUrl,
        },
        { abortEarly: false }
      )
      return result
    } catch (err) {
      setErrors(err.errors)
    }
  }
  async function sendHandler() {
    const result = await validation()
    if (result) {
      setErrors([])
      const response = await fetch('/api/story/save', {
        method: 'POST',
        body: JSON.stringify(result),
        headers: { 'Content-Type': 'application/json', Authorization: session.userToken },
      })
      const data = await response.json()
      setUserId(data.userId)
      if (response.status === 200) {
        if (changeProfilePicture) {
          const body = new FormData()
          body.append('file', image, image.name)
          body.append('email', session.user.email)
          axios.post(process.env.public_url + '/api/savePicture', body, {
            headers: {
              Authorization: session.userToken,
            },
          })
          setChangeProfilePicture(false)
        }
        setSaveStoryState(true)
      } else {
        const data = await signOut()
      }
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (saveStoryState) {
      const timeout = setTimeout(() => {
        setSaveStoryState(false)
      }, 4000)
    }
  }, [saveStoryState])

  const changeProfilePictureHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]
      setImage(i)
      setImageUrl(URL.createObjectURL(i))
      setChangeProfilePicture(true)
    }
  }

  return (
    <>
      <Head>
        <title>داستان من</title>
      </Head>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-2">
          <h1 className="text-xl font-extrabold leading-4 tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-4xl md:leading-14">
            داستان من ...
          </h1>
          <p className=" clear-right text-base leading-7 text-gray-500 dark:text-gray-400 sm:text-base sm:leading-7 md:text-lg md:leading-8">
            اینجا قراره قصه ات رو برای بقیه جوری روایت کنی که با خوندن اون بعضی از سوالهایی که توی
            ذهنشون حوزه فعالیت تو هست پاسخ بگیرن ،
            <br />
            پس خوب روایت کن :)
          </p>
        </div>
        <div className={'container p-4'}>
          <div className={'flex flex-row flex-wrap items-center justify-between pb-2'}>
            {errors.length !== 0 && (
              <button
                type="button"
                className="my-2 inline-block rounded bg-red-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg"
                onClick={sendHandler}
              >
                ذخیره
                <span className="mx-1 inline-block whitespace-nowrap rounded bg-red-600 py-1 px-1.5 text-center align-baseline text-xs leading-none text-white sm:text-xs md:text-sm ">
                  {errors.length}
                </span>
              </button>
            )}
            {errors.length === 0 && (
              <button
                type="button"
                className="my-2 inline-block rounded bg-green-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                onClick={sendHandler}
              >
                ذخیره
              </button>
            )}
            {saveStoryState && (
              <a href={`/stories/${userId}`}>
                <span
                  className="mr-3 inline-flex w-auto  items-center shadow-lg rounded-lg bg-green-100 py-2.5 text-xs text-green-700 md:text-base"
                  role="alert"
                  dir={'rtl'}
                >&nbsp;
                  &nbsp; نمایش
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="check-circle"
                    className="mr-2 h-4 w-4 fill-current"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                    ></path>
                  </svg>&nbsp;
                </span>
              </a>
            )}

            <div className="relative float-left h-24 w-24 drop-shadow-lg duration-300 hover:scale-110 sm:h-36 sm:w-36 md:h-48 md:w-48">
              <Image
                src={imageUrl === null ? Avatar : imageUrl}
                alt="avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-full "
              />
              <label
                htmlFor="dropzone-file"
                className="absolute inset-0 bottom-0 z-10 flex cursor-pointer items-center justify-center rounded-full bg-white bg-opacity-50 text-xs text-black opacity-0  duration-300 hover:opacity-100 md:text-base "
              >
                بار گزاری تصویر
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={changeProfilePictureHandler}
                />
              </label>
            </div>
          </div>
          {errors.length !== 0 &&
            errors.map((err, index) => (
              <div
                className="mb-2 rounded-lg bg-red-100 py-3 px-6 text-sm leading-4 text-red-700 md:py-5 md:text-base md:leading-6"
                role="alert"
                key={index}
              >
                {err}
              </div>
            ))}
        </div>
        <div className="container py-4">
          <div className="justify-right flex flex-col md:flex-row">
            <div className="mb-3 w-full md:w-96 ">
              <label
                htmlFor="nickNameInput"
                className="form-label mb-2 inline-block text-sm text-gray-700 dark:text-gray-400 md:text-base md:text-xl"
              >
                اسمت چیه ؟
              </label>
              <input
                type="text"
                className=" form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5
                            text-sm font-normal text-gray-700 transition ease-in-out focus:border-blue-600
                            focus:bg-white focus:text-gray-700 focus:outline-none dark:border-gray-600 dark:border-gray-600
                            dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 md:text-xl"
                id="nickNameInput"
                ref={nicknameRef}
                placeholder="نام و نام خانوادگی"
              />
            </div>
            <div className="mb-3 w-full md:mr-4">
              <label
                htmlFor="titleRefInput"
                className="form-label mb-2  inline-block text-sm text-gray-700 dark:text-gray-400 md:text-xl"
              >
                در چه حوزه ای فعالیت می کنی ؟
              </label>
              <input
                type="text"
                className=" form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5
                            text-sm font-normal text-gray-700 transition ease-in-out focus:border-blue-600
                            focus:bg-white focus:text-gray-700 focus:outline-none dark:border-gray-600 dark:border-gray-600
                            dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 md:text-xl"
                id="titleRefInput"
                ref={jobTitleRef}
                placeholder="مثلا : خبر نگار یا برنامه نویس"
              />
            </div>
          </div>

          <div>
            <TextAreComponent
              refElement={shortStoryRef}
              textareaId={'shortStory'}
              textareaLabel={'داستان خودت رو به صورت خیلی کوتاه بگو'}
              placeholder="من ..."
            />
            <TextAreComponent
              textareaId={'whatWhere'}
              refElement={whatWhereRef}
              textareaLabel={'کجا و چیکار میکنی؟'}
              placeholder="حالا به بقیه بگو کجا و چیکار میکنی"
            />
            <TextAreComponent
              textareaId={'hardware'}
              refElement={hardwareRef}
              textareaLabel={'از چه ابزار و یا سخت افری استفاده میکنی؟'}
              placeholder="توی کارت چه سخت افزاری بیشترین استفاده رو برات داره و احتمالا کانفیگش چیه؟"
            />
            <TextAreComponent
              textareaId={'software'}
              refElement={softwareRef}
              textareaLabel={'از چه نرم افزاری استفاده میکنی؟'}
              placeholder="نرم افزار های مورد استفاده ات چی هستن؟"
            />
            <TextAreComponent
              textareaId={'whatYouWant'}
              refElement={whatYouWantRef}
              textareaLabel={'محیط کار رویاییت چه شکلیه؟'}
              placeholder="دوست داری محیط کارت چه شکلی باشه؟"
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default mystory

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}
