import './DNDSortableSingleItem.scss'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan, faCertificate, faCircle, faBolt} from '@fortawesome/free-solid-svg-icons'

export const DNDSortableSingleItem = (props) => {
  const sortable = useSortable({id: props.itemId});
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = sortable;
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  /*-------------------------------------------------
  ----- CHOISIR LA PHOTO PRINCIPALE DE LA SÉRIE -----
  -------------------------------------------------*/

  function handleMainImage(index) {
      if (index >= 0 && index <= props.imageFiles.length -1) {
        props.setMainImageIndex(index)
      } else {
        props.setMainImageIndex(0)
      }
  }

  return (
    <div 
      className='item'
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
      {...listeners}>
      <img className='item_img'
        src={props.item.imageUrl ?? (props.item instanceof File ? props.item.sampleImageUrl : '')}
        alt={`image ${props.item._id}`}/>
      <div className='item_buttons'>
          <button type='button' aria-label="Supprimer l'image" className='item_buttons_supprButton'
            onMouseDown={() => {
              props.openConfirmBox(props.index);
            }}
            draggable="false"
            >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          { props.displayClass==='grid' &&
          <button type='button' aria-label="Définir cette image comme image principale de la série" className='item_buttons_isMainButton'
            onMouseDown={() => { handleMainImage(props.index)}} >
            <FontAwesomeIcon icon={props.index === props.mainImageIndex ? faCertificate : faCircle} className={props.index === props.mainImageIndex ? 'item_buttons_isMainButton--isOrange' : 'item_buttons_isMainButton--isWhite'} />
          </button>
          }
      </div>
    </div>
  );
};
