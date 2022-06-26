import Head from 'next/head'
import { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import { getSession, signOut, useSession } from 'next-auth/react'
import AccessDenied from './404'
import axios from 'axios'

function dashboard(props) {
  /* eslint-disable */

  const [modalOn, setModalOn] = useState(false)
  const [choice, setChoice] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [family, setFamily] = useState("");
  const [saveProfile, setSaveProfile] = useState(false);
  const { data: session } = useSession()

  if (!session) {
    return <AccessDenied />
  }
  const showModalClicked = () => {
    setModalOn(true)
  }

  useEffect(() => {
    if (choice) {
      console.log("delete story handler")
      axios.delete(process.env.NEXT_PUBLIC_API_URL + '/api/deleteStory',  {
        headers: {
          Authorization: session.userToken,
          'Access-Control-Allow-Origin': '*',
        },
      }).then((res) => {
        signOut({ callbackUrl: '/' })
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [choice])
useEffect( ()=>{
  const getData = async () => {
    const session =await getSession();
    setEmail(session.user.email)
    setName(session.user.name)
    setFamily(session.user.family)
    setUserId(session.user.id)
  }
  getData()
},[])
  useEffect(() => {
if (saveProfile) {
      const timeout = setTimeout(() => { setSaveProfile(false)}, 3000);
    }
  }, [saveProfile])
  const saveInfoHandler =async () => {
    const user={
      id: userId,
      email:email,
      name:name,
      family:family,
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/saveUser', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    })
    if (response.status === 200) {
      setSaveProfile(true)
    }
  }




  return (
    <>
      <Head>
        <title>داشبورد</title>
      </Head>
      <div className="space-y-2 divide-gray-200 pt-6 pb-8 md:space-y-2 dark:divide-gray-700 ">
        <h1 className="text-xl font-extrabold leading-4 tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-4xl md:leading-14">
          داشبورد اطلاعات تو ...
        </h1>
        <p className="text-base leading-7 text-gray-500 dark:text-gray-400 sm:text-base sm:leading-7 md:text-lg md:leading-8">
          اینجا هم اطلاعات کاربری شما ثبت شده
          <br />
          اگه خواستی تغیرش بده ؛)
        </p>
      </div>
      <div className={'container flex justify-center p-4 '}>
        <div className="block max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 md:w-96 w-full">
          <div className="form-group mb-6">
            <label
              htmlFor="inputEmail"
              className="form-label mb-2 inline-block text-gray-700 dark:text-gray-400">
              ادرس ایمیل
            </label>
            <input
              disabled={true}
              dir={'ltr'}
              defaultValue={email}
              className="form-control m-0
        block
        w-full
        rounded
        border
        border-solid
        border-gray-300
        bg-gray-200 bg-clip-padding
        px-3 py-1.5 text-base
        font-normal
        text-gray-700
        transition
        ease-in-out
        focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none
        dark:border-gray-600
        dark:border-gray-600 dark:bg-gray-500 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              id="inputEmail"
              placeholder="آدرس ایمیل"
            />
          </div>
          {saveProfile && (<div
            className="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full"
            role="alert"
            dir={"rtl"}>با موفقیت ذخیره شد
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle"
                 className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512">
              <path fill="currentColor"
                    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
            </svg>
          </div>)}
          <div className="form-group mb-6">
            <label
              htmlFor="inputName"
              className="form-label mb-2 inline-block text-gray-700 dark:text-gray-400">
              نام
            </label>

            <input
              className="form-control m-0
        block
        w-full
        rounded
        border
        border-solid
        border-gray-300
        bg-white bg-clip-padding
        px-3 py-1.5 text-base
        font-normal
        text-gray-700
        transition
        ease-in-out
        focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none
        dark:border-gray-600
        dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              id="inputName"
              placeholder="نام"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-6">
            <label
              htmlFor="inputFamily"
              className="form-label mb-2 inline-block text-gray-700 dark:text-gray-400"
            >
              نام خانوادگی
            </label>

            <input
              defaultValue={family}
              onChange={(e) => setFamily(e.target.value)}
              className="form-control m-0
        block
        w-full
        rounded
        border
        border-solid
        border-gray-300
        bg-white bg-clip-padding
        px-3 py-1.5 text-base
        font-normal
        text-gray-700
        transition
        ease-in-out
        focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none
        dark:border-gray-600
        dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              id="inputFamily"
              placeholder="نام خانوادگی"
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
              <button
                type="button"
                className="
      rounded
      bg-blue-600
      ml-2
      px-6
      py-2.5
      text-xs
      font-medium
      uppercase
      leading-tight
      text-white
      shadow-md
      transition duration-150
      ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
      focus:shadow-lg focus:outline-none
      focus:ring-0
      active:bg-blue-800
      active:shadow-lg"
                onClick={saveInfoHandler}
              >
                ذخیره
              </button>
              <button
                type="button"
                className="
      rounded
      bg-red-600
      px-6
      py-2.5
      text-xs
      font-medium
      uppercase
      leading-tight
      text-white
      shadow-md
      transition duration-150
      ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700
      focus:shadow-lg focus:outline-none
      focus:ring-0
      active:bg-red-800
      active:shadow-lg"
                onClick={showModalClicked}
              >
                حذف داستان
              </button>
              {modalOn && (
                <Modal
                  setModalOn={setModalOn}
                  setChoice={setChoice}
                  title={'حذف داستان'}
                  message={'شما درحال حذف داستان خود می باشد، آیا تمایل به ادامه دارید؟'}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default dashboard

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}
