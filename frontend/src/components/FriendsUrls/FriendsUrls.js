import './FriendsUrls.scss';

function FriendsUrls() {

    const friendsUrls = [
        {
            "itemName":"Benjamin Gibert - Développement web.",
            "itemUrl":"https://bengibert.com"
        },
        {
            "itemName":"3dinside - Architecture",
            "itemUrl":"https://3dinside.tumblr.com/"
        },
        {
            "itemName":"Le son du crayon - Architecture",
            "itemUrl":"https://www.lesonducrayon.fr/"
        },
        {
            "itemName":"Mathilde Cognet - Architecture",
            "itemUrl":"https://www.mathildecognet-architecte.com/"
        },
        {
            "itemName":"Vivement Bientôt - Architecture",
            "itemUrl":"https://vivement-bientot-architecture.fr/"
        },
        {
            "itemName":"Un autre espace - Architecture",
            "itemUrl":"https://www.unautreespace.fr/"
        },
        {
            "itemName":"François Maisonnasse - Photographie",
            "itemUrl":"https://divisare.com/authors/2144787241-francois-maisonnasse"
        }
    ]

    return (
        <div className='friendsUrls'>
            <ul>
                {friendsUrls.map((item, idx) => (
                    <li key={idx}>
                        <a href={item.itemUrl} target="_blank" rel="noreferrer">{item.itemName}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FriendsUrls;