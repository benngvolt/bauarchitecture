import './ArgumentsSection.scss';

import argumentsData from '../../assets/arguments.json';

function ArgumentsSection() {
    return (
        <section className='arguments'>
            <h2>Une approche fondée sur l'écoute et l'expérience</h2>
            <p className='arguments_intro'>Concevoir un projet, c'est répondre à un lieu, à un usage et à des contraintes réelles.</p>
            <ul className='arguments_list'>
                {argumentsData.map((argument) => (
                    <li
                        className='arguments_list_item'
                        key={argument.title}
                    >
                        <h3>{argument.title}</h3>

                        <ul className='arguments_list_item_steps'>
                            {argument.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ArgumentsSection;