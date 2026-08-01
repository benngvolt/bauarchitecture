import './EditFaqItemsList.scss'
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'

import React, { useState } from 'react'
import { API_URL } from '../../utils/constants'



function EditFaqItemsList ({
    faqItems,
    handleEditFaqItem,
    handleLoadFaqItems,
    setLoaderDisplay
    }) {

    const [confirmBoxFAQState, setConfirmBoxFAQState] = useState(false);
    const [faqItemToDelete, setFaqItemToDelete] = useState(null);

    function closeConfirmBox () {
        setConfirmBoxFAQState(false);
    }
    function openConfirmBox () {
        setConfirmBoxFAQState(true);
    }

    function deleteFaqItem() {
        setLoaderDisplay(true)
        fetch(`${API_URL}/api/faq-items/${faqItemToDelete._id}`, {
            method: 'DELETE',
            headers: {
                // Authorization: `Bearer ${sessionStorage.getItem('1')}`,
              },
        })
        .then ((response) => {
            if(response.ok) {
                setLoaderDisplay(false)
            }
            setConfirmBoxFAQState (false);
            handleLoadFaqItems();
            setFaqItemToDelete (null);
        })
        .catch ((error)=> {
            setLoaderDisplay(false)
            console.log(error.message);
        })
    }

    return (
        <div className='editFaqItemsList'>
            <ul className='editFaqItemsList_list'>
                {faqItems.map((faqItem)=>(
                <li className='editFaqItemsList_list_item' key={faqItem._id}>
                    <p className='editFaqItemsList_list_item_question'>{faqItem.question}</p>
                    <div className='editFaqItemsList_list_item_buttonsContainer'>
                        <button aria-label={`Supprimer la question "${faqItem.question}"`} onClick={() => {
                            setFaqItemToDelete (faqItem)
                            openConfirmBox()
                            }}
                            type='button'>
                            Supprimer
                        </button>
                        <button aria-label={`Modifier la question "${faqItem.question}"`} onClick={() => {
                            handleEditFaqItem(faqItem);
                            }}>
                            Modifier
                        </button>
                    </div>
                </li>
                ))}
            </ul>
            <ConfirmBox
                confirmBoxState={confirmBoxFAQState}
                affirmativeChoice={deleteFaqItem}
                negativeChoice={closeConfirmBox}
            />
        </div>
    )
}

export default EditFaqItemsList
