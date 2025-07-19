import React, { useEffect, useState } from 'react'
import { QueryModal } from './QueryModal'
import { useOutletContext } from 'react-router'
import { capitalizeWords } from '../../Functions/functions'
import { DateTime } from '../../Date Time Formate/DateTime'

export const Queries = () => {
    const { queries } = useOutletContext()
    const [description,setDescription]=useState(null)
    return (
        <div className=' w-full'>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            {
                                queries.length > 0 && Object.keys(queries[0]).map((item, index) => {
                                    if (item =='SupportType' ||item =='contactNumber' || item =='email' ||item =='model'|| item=='createdAt'  ) {
                                        
                                        
                                        return (
                                            <th key={index}>{
                                                item=='createdAt'?

                                                ('Time')
                                                :

                                                capitalizeWords(item)
                                                
                                                
                                                }</th>
                                        )
                                    }

                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                 
                            {
                                queries && queries.map((item, index) => {
                                   return (
                                        <tr key={index} onClick={()=>{setDescription(item.description); document.getElementById('queryDetails').checked = true  }}  className='hover:bg-blue-400 hover:text-white cursor-pointer transition-all duration-110 ease-in-out  ' >
                                            <th>{index+1}</th>
                                            
                                            <td>{item.SupportType}</td>
                                            <td>{item.contactNumber}</td>
                                            <td>{item.email}</td>
                                            <td className='font-semibold'>{item?.model?.toUpperCase()}</td>
                                            <td><DateTime item={item.createdAt} ></DateTime></td>

                                        </tr>
                                    )
                                })
                            }



                    </tbody>
                </table>
            </div>

            <QueryModal description={description} ></QueryModal>


        </div>
    )
}
