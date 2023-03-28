import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { IContacts } from '../types/contact.types';

type Props = {
  name: string,
  number: string,
  contactId: string,
  index: string,
  categoryId: any,
  contacts: IContacts[],
  setCategoryContacts: React.Dispatch<React.SetStateAction<IContacts[]>>,
  handleDelete: (contactId:string) => void
}

const SingleContact = ({ name, number, contactId, index, setCategoryContacts, contacts, categoryId,handleDelete }: Props) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleClick = () =>{
    handleDelete(contactId)
  }

  const handleSelect = () => {
    setIsSelected(!isSelected);
  }

  return (
    <tr
      className={`border-b dark:border-neutral-500 ${isSelected ? 'bg-gray-200' : ''}`}
      onClick={handleSelect}
    >
      <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
      <td className="whitespace-nowrap px-6 py-4">{name}</td>
      <td className="whitespace-nowrap px-6 py-4">{number}</td>
      <td className="whitespace-nowrap ">
        <span onClick={handleClick} title={`Delete ${name}`} className="cursor-pointer z-10 bg-gray-150 font-medium text-gray-600 bg-gray-100 hover:bg-gray-200">
          <FaTrash />
        </span>
      </td>
    </tr>
  )
}

export default SingleContact;
