import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { IContact, IContacts } from "../types/contact.types";
import NotFoundSvg from "../assets/NotFound.svg";
import Loader from "../loader/Loader";
import SingleContact from "./SingleContact";
import { ContactContext } from "../context";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";

type Props = {
  contacts: IContact;
};

const Contacts = ({ contacts }: Props) => {
  const { setCategoryContacts, categoryContacts } = useContext(ContactContext);
  const { categoryId } = useParams<{ categoryId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState<IContacts[]>([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const filteredContacts = contacts.filter(
          (item: IContacts) => item.category === categoryId
        ) as IContacts[];
        setContact(filteredContacts);
        setCategoryContacts(filteredContacts);
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getContacts();
  }, [categoryId, contacts, setCategoryContacts]);

  const handleDelete = async (contactId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/contact/delete`, {
        method: "DELETE",
        mode: "cors",
        body: JSON.stringify({ contactId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        const filter =
          contacts &&
          contacts.filter((item: any) => item._id !== data.data._id);
        setCategoryContacts(filter);
      } else {
        toast.error(data.data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loader />
        </div>
      ) : contact.length > 0 && categoryContacts.length > 0 ? (
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Number
                    </th>
                    <th scope="col" className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {categoryContacts &&
                    categoryContacts.map((item: any, index: any) => (
                      <SingleContact
                        setCategoryContacts={categoryContacts}
                        key={index}
                        index={index + 1}
                        name={item.name}
                        contacts={categoryContacts}
                        number={item.number}
                        categoryId={categoryId}
                        contactId={item._id}
                        handleDelete={handleDelete}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img
            src={NotFoundSvg}
            alt="not-found"
            className="h-48 w-48 text-gray-400 mb-8"
          />
          <h1 className="text-4xl font-bold text-gray-700 mb-4">
            No contacts Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            There are no contacts under this category.
          </p>
        </div>
      )}
    </>
  );
};

export default Contacts;
