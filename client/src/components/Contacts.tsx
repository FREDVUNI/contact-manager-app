import React,{ useState,useEffect,useContext } from 'react'
import { useParams } from 'react-router-dom';
import { IContact, IContacts } from '../types/contact.types'
import NotFoundSvg from '../assets/NotFound.svg'
import Loader from '../loader/Loader'
import SingleContact from './SingleContact';
import { ContactContext } from '../context';

const Contacts = ({contacts}: IContact) => {

    const [contact,setContact] = useState<IContacts[]>()
    const {setCategoryContacts,categoryContacts} = useContext(ContactContext)
    const { categoryId } = useParams<{categoryId:string}>()

    useEffect(() =>{
        const getContacts = async() =>{
            try{
                setContact(contacts.filter((item:any) => item.category === categoryId))
                setCategoryContacts(contact)
                console.log(categoryContacts)
            }
            catch(error:any){
                console.log(error)
            }
        }
        getContacts()
    },[contacts])

  return (
    <>
    {
        contacts && contacts.length > 0 ? (
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                        <th scope="col" className="px-6 py-4">#</th>
                        <th scope="col" className="px-6 py-4">Name</th>
                        <th scope="col" className="px-6 py-4">Number</th>
                        <th scope="col" className="px-6 py-4"></th>
                        </tr>
                    </thead> 
                    <tbody>
                        {contact && contact.map((item:any,index:any) =>(
                            <SingleContact setCategoryContacts={contacts.filter((item:any) => item.category === categoryId)} categoryContacts={contact} key={index} index={index + 1} name={item.name} number={item.number} contactId={item._id}/>
                        ))
                        }
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        ):
        (
            <div className="flex flex-col justify-center items-center h-screen">
                <Loader/>
            </div>
        )
        ?(
            <div className="flex flex-col justify-center items-center">
                <img src={NotFoundSvg} alt="not-found" className="h-48 w-48 text-gray-400 mb-8" />
                <h1 className="text-4xl font-bold text-gray-700 mb-4">No contacts Found</h1>
                <p className="text-lg text-gray-600 mb-8">There are no contacts under this category.</p>
            </div>
        ):(
            <div className="flex flex-col justify-center items-center h-screen">
                <Loader/>
            </div>
        )
    }
    </>
)
}

export default Contacts