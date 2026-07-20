import './PhilosophySection.scss';
import portrait from '../../assets/portrait.webp'

function PhilosophySection() {
    return (
        <section className='philosophy'>
            <h2>Un parcours, une manière de faire</h2>

            <div className='philosophy_content'>
                <div className='philosophy_text'>
                    <p>
                        De la diversité de mon parcours, des programmes, des
                        lieux et des échelles abordés, ce processus est le fil
                        rouge du travail présenté ici, nourri de ce que j’ai
                        appris, désappris, expérimenté, compris et défendu.
                    </p>

                    <p>
                        D’abord au contact des nombreuses agences qui m’ont
                        accueillie, tout près d’ici ou loin là-bas. Elles m’ont
                        permis d’aborder des échelles et des typologies de
                        projets d’une grande richesse et de découvrir la force
                        d’une équipe.
                    </p>

                    <p>
                        Puis, dès 2018, dans un parcours en mon nom. Choisi,
                        orienté, dessiné et destiné par moi-même, mais toujours
                        entourée, en complicité et en confiance. J’y ai alors
                        découvert tous mes autres métiers et l’importance du
                        chantier.
                    </p>

                    <p>
                        Observer, diagnostiquer, comprendre, proposer : ce fil
                        rouge a été ma constante.
                    </p>

                    <p>
                        L’attention portée à la lecture d’un contexte, d’un
                        lieu et d’une situation donne justesse, sens et
                        cohérence à l’intervention.
                    </p>
                </div>

                <figure className='philosophy_figure'>
                    <img
                        src={portrait}
                        alt=''
                    />
                </figure>
            </div>
        </section>
    );
}

export default PhilosophySection;