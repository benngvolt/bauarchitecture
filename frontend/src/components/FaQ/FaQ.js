import './FaQ.scss'

function FaQ() {
    
    const faqList = [
        {
            "question":"Pourquoi suis-je en train de poser une question sur la charpente de ma maison?",
            "answer":"Parceque regarde je vais te mettre un gros pavé: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur "
        },
        {
            "question":"Quelle est la couleur du cheval blanc d'Henri IV?",
            "answer":"Tu me les brises je te l'ai déjà dit quinze fois: natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur "
        },
        {
            "question":"Pourquoi Jean-Pierre Pernaud?",
            "answer":"Parceque Chantal, directrice des RH de l'entreprise individuelle 'Faudra Tif'Hair', salon de coiffure à Issy-les-Moulineaux. antium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur "
        },
        {
            "question":"Pourquoi suis-je en train de poser une question sur la charpente de ma maison?",
            "answer":"Parceque regarde je vais te mettre un gros pavé: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur "
        },
        {
            "question":"Quelle est la couleur du cheval blanc d'Henri IV?",
            "answer":"Tu me les brises je te l'ai déjà dit quinze fois: natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur "
        },
        {
            "question":"Pourquoi Jean-Pierre Pernaud?",
            "answer":"Parceque Chantal, directrice des RH de l'entreprise individuelle 'Faudra Tif'Hair', salon de coiffure à Issy-les-Moulineaux. antium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur "
        }
    ]

   
    return  (      
        <div className='faqSection'>
            <h4 className='faqSection_title'>Questions fréquentes</h4>
            <ul className='faqSection_list'>
                {faqList.map((faq)=>(                
                <li className='faqSection_list_item'>
                    <p className='faqSection_list_item_question'>{faq.question}</p>
                    <p className='faqSection_list_item_answer'>{faq.answer}</p>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default FaQ