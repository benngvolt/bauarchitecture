import './Curriculum.scss';
import { useContext } from 'react';
import DOMPurify from 'dompurify';
import { ProjectsContext } from '../../utils/ProjectsContext';

function Curriculum() {
    const { aboutPageContent } = useContext(ProjectsContext);

    if (!aboutPageContent?.curriculumText) {
        return null;
    }

    return (
        <div
            className='curriculum'
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(aboutPageContent.curriculumText, { ADD_ATTR: ['target'] }),
            }}
        />
    );
}

export default Curriculum;
