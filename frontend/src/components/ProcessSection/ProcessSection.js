import './ProcessSection.scss';

import process from '../../assets/process.json';


function ProcessSection() {
    return (
        <section className='process'>
            {/* <h2>Une architecture qui commence par comprendre</h2> */}
            <ul className='process_list'>
                {process.map((process, processIndex) => (
                    <li
                        className='process_list_item'
                        key={process.title}
                    >
                        <div className='process_list_item_content'>
                            <p className='process_list_item_content_index'>0{processIndex+1}</p>
                            <h3>{process.title}</h3>
                            <p className='process_list_item_content_text'>{process.text}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ProcessSection;