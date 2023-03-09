import React,{useState} from 'react'

type Props = {}
const inputStyles = 'my-2 w-full px-5 py-3 border border-solid border-neutral-300 bg-transparent bg-clip-padding text-base font-normal text-neutral-700 outline-none placeholder:text-neutral-500'

const AddCategory = (props: Props) => {
    const [category,setCategory] = useState("")

    const handleSubmit = async(e:any) =>{
        try{
            e.prventDefault()
            await fetch('http://localhost:4002/api/category/add',{
                method:'POST',
                body:JSON.stringify({category}),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const new_category = await Response.json()
            console.log(new_category)
        }
        catch(error){

        }
    }

  return (
    <div className='grid min-h-full bg-white px-6 sm:py-30 lg:px-8'>
   <div className="bg-white py-18 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
         <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Manage Your <span className='text-orange-500'>Contacts</span></h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">Add contact category here.</p>
            <div className="flex">
               <div className="relative mt-5 mb-3 xl:w-96">
                  <form onSubmit={handleSubmit}>
                  <input
                     type="text"
                     className={"peer block min-h-[auto] w-full border border-solid border-neutral-300 bg-transparent py-2 px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"} />
                  <label
                     className="pointer-events-none absolute top-0 left-3 mb-3 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-700 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                     >Contact category
                  </label>
                  <button
                      type="button"
                      className="inline-block border bg-orange-500 text-dark px-12 pt-2 py-4 pb-[6px] mt-5 text-sm font-medium uppercase ">
                      save
                    </button>
                  </form>
               </div>
            </div>
         </div>
         <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <article className="flex max-w-xl flex-col items-start justify-between">
               <div className="flex items-center gap-x-4 text-xs">
                  <a href="#" className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100">Marketing</a>
               </div>
               <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                     <a href="#">
                     <span className="absolute inset-0"></span>
                     Boost your conversion rate
                     </a>
                  </h3>
                  <p className="mt-5 text-lg  text-gray-600">Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.</p>
               </div>
               <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                     <p className="font-semibold text-gray-900">
                        <a href="#">
                        <span className="absolute inset-0"></span>
                        Michael Foster
                        </a>
                     </p>
                     <p className="text-gray-600">Co-Founder / CTO</p>
                  </div>
               </div>
            </article>
         </div>
      </div>
   </div>
</div>
  )
}

export default AddCategory