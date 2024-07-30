import  './DNDGrid.scss'

function DNDGrid ({children, displayClass}) {
    
    return (
        <div className='dndRow'>
            {children}
        </div>
    );
}
export default DNDGrid