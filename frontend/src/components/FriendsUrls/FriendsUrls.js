import './FriendsUrls.scss';
import { useContext } from 'react';
import { ProjectsContext } from '../../utils/ProjectsContext';

function FriendsUrls() {
    const { friendUrls } = useContext(ProjectsContext);

    if (!friendUrls || friendUrls.length === 0) {
        return null;
    }

    return (
        <div className='friendsUrls'>
            <ul>
                {friendUrls.map((item) => (
                    <li key={item._id}>
                        <a href={item.itemUrl} target="_blank" rel="noreferrer">{item.itemName}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FriendsUrls;
