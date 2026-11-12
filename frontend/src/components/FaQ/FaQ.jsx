import './FaQ.scss'
import { useContext } from 'react'
import DOMPurify from 'dompurify'
import { ProjectsContext } from '../../utils/ProjectsContext'

function FaQ() {
    const { faqItems } = useContext(ProjectsContext);

    return  (
        <div className='faqSection'>
            <h4 className='faqSection_title'>Questions fréquentes</h4>
            {faqItems.length === 0 ? (
                <p className='faqSection_empty'>Aucune question pour le moment.</p>
            ) : (
                <ul className='faqSection_list'>
                    {faqItems.map((faq)=>(
                    <li className='faqSection_list_item' key={faq._id}>
                        <p className='faqSection_list_item_question'>{faq.question}</p>
                        <div
                            className='faqSection_list_item_answer'
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(faq.answer || ''),
                            }}
                        />
                    </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default FaQ