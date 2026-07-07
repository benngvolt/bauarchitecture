import './ArticleForm.scss';
import FormSimpleField from '../FormSimpleField/FormSimpleField';
import FormCaptionField from '../FormCaptionField/FormCaptionField';
import Loader from '../Loader/Loader';
import React, { useState, useRef, useEffect } from 'react';
import FormRichTextField from '../FormRichTextField/FormRichTextField';
import FormImageField from '../FormImageField/FormImageField';
import DNDGallery from '../DNDGallery/DNDGallery';
import { API_URL } from '../../utils/constants';

function ArticleForm({
  handleLoadArticles,
  articleFormMode,
  articleEdit,
  setArticleEdit,
  setDisplayArticleForm,
  loaderDisplay,
  setLoaderDisplay,
}) {
  const [articleTitle, setArticleTitle] = useState('');
  const [articleDescription, setArticleDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [caption, setCaption] = useState('');
  const [mainArticleIndex, setMainArticleIndex] = useState(0);
  const [captionIndex, setCaptionIndex] = useState(null);
  const [captionModalDisplay, setCaptionModalDisplay] = useState(false);

  const inputArticleTitleRef = useRef(null);
  const inputArticleDescriptionRef = useRef(null);
  const inputArticleCaptionRef = useRef(null);

  useEffect(() => {
    formatFields();
  }, [articleFormMode]);

  function formatFields() {
    if (articleFormMode === 'add') {
      setArticleTitle('');
      setArticleDescription('');
      setMainArticleIndex(0);
      setImageFiles([]);
    } else {
      setArticleTitle(articleEdit.title);
      setArticleDescription(articleEdit.description);
      setMainArticleIndex(articleEdit.mainArticleIndex ?? 0);
      setImageFiles(articleEdit.articles ?? []);
    }
  }

  useEffect(() => {
    const element = document.getElementById('inputArticleDescription');

    if (element) {
      element.editor.setSelectedRange([0, 0]);
      element.editor.loadHTML(articleDescription);
    }
  }, [articleDescription, articleFormMode]);


  function handleCaptionChange(index, newCaption) {
    setCaption(newCaption);
  }


  function openCaptionModal(index) {
    setCaptionIndex(index);
    setCaption(imageFiles[index].caption);
    setCaptionModalDisplay(true);
  }


  function closeCaptionModal() {
    setCaptionIndex(null);
    setCaption('');
    setCaptionModalDisplay(false);
  }


  function captionSubmit(index, value) {
    const updatedImages = [...imageFiles];
    updatedImages[index].caption = value;
    setImageFiles(updatedImages);
    closeCaptionModal();
  }


  function articleFormSubmit(event) {
    event.preventDefault();
    setLoaderDisplay(true);


    const articleFormData = new FormData();


    // RÉCUPÉRATION DIRECTE DU CONTENU HTML DE L'ÉDITEUR
    const descriptionHtml =
      document
        .getElementById('inputArticleDescription')
        ?.editor
        ?.getDocument()
        .toString() || '';


    articleFormData.append(
      'title',
      inputArticleTitleRef.current.value
    );

    articleFormData.append(
      'description',
      descriptionHtml
    );

    articleFormData.append(
      'mainArticleIndex',
      mainArticleIndex
    );


    const newImageFiles = Array.from(imageFiles);


    const imagesWithIndex = newImageFiles.map((image, index) => ({
      index,
      image,
    }));


    imagesWithIndex.forEach(({ index, image }) => {
      if (image instanceof File) {

        articleFormData.append(
          'articles',
          image
        );

        articleFormData.append(
          'articleFileIndexes',
          index
        );

      } else {

        articleFormData.append(
          `existingArticles[${index}]`,
          JSON.stringify(image)
        );

      }
    });


    // DEBUG FORMDATA
    for (let pair of articleFormData.entries()) {
      console.log(pair[0], pair[1]);
    }


    if (!inputArticleTitleRef.current.value) {
      setLoaderDisplay(false);
      return;
    }


    if (articleFormMode === 'add') {

      fetch(`${API_URL}/api/articles`, {
        method: 'POST',
        headers: {
          // Authorization: 'Bearer ' + token,
        },
        body: articleFormData,
      })

        .then((response) => {

          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(
                `Erreur ${response.status}: ${text}`
              );
            });
          }

          return response.json();

        })

        .then(() => {
          handleLoadArticles();
          setDisplayArticleForm(false);
          setLoaderDisplay(false);
        })

        .catch((error) => {
          console.error(
            'Erreur lors de la requête :',
            error
          );
          setLoaderDisplay(false);
        });


    } else if (articleFormMode === 'edit') {


      fetch(`${API_URL}/api/articles/${articleEdit._id}`, {

        method: 'PUT',

        headers: {
          // Authorization: 'Bearer ' + token,
        },

        body: articleFormData,

      })

        .then((response) => {

          if (response.ok) {
            return response;
          }

          throw new Error(
            'La requête a échoué'
          );

        })

        .then(() => {
          handleLoadArticles();
          setDisplayArticleForm(false);
          setLoaderDisplay(false);
        })

        .catch((error) => {
          console.error(error);
          setLoaderDisplay(false);
        });
    }
  }


  return (
    <div className='projectFormContainer'>

      <form
        className='projectForm'
        onSubmit={articleFormSubmit}
        method='post'
      >

        {loaderDisplay === true && <Loader />}


        <div className='projectForm_closeButton'>
          <button
            type='button'
            onClick={() => setDisplayArticleForm(false)}
          >
            X FERMER
          </button>
        </div>


        <div className='projectForm_form'>

          <FormSimpleField
            htmlFor='inputArticleTitle'
            label='TITRE*'
            type='text'
            id='inputArticleTitle'
            ref={inputArticleTitleRef}
            value={articleTitle}
            onChangeFunction={setArticleTitle}
          />


          <FormRichTextField
            htmlFor='inputArticleDescription'
            label="DESCRIPTION DE L'ARTICLE"
            type='hidden'
            id='inputArticleDescription'
            ref={inputArticleDescriptionRef}
            name='articleDescription'
            value={articleDescription}
          />


          <DNDGallery
            isCaptionFormAvailable={false}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            mainImageIndex={mainArticleIndex}
            setMainImageIndex={setMainArticleIndex}
            displayClass='articlesGrid'
          />


          <FormImageField
            htmlFor='inputImage'
            label='TÉLÉCHARGER UNE IMAGE'
            type='file'
            id='inputImage'
            name='image'
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
          />

        </div>


        <div className='projectForm_submitButton'>
          <button type='submit'>
            ENVOYER
          </button>
        </div>


        {captionModalDisplay === true && (

          <div className='projectForm_imageCaptionFormModal'>

            <FormCaptionField
              htmlFor='inputArticleCaption'
              label='LÉGENDE'
              type='text'
              id='inputArticleCaption'
              ref={inputArticleCaptionRef}
              value={caption}
              onChangeFunction={handleCaptionChange}
              index={captionIndex}
              closeModal={closeCaptionModal}
              captionSubmit={captionSubmit}
              imageFiles={imageFiles}
            />

          </div>

        )}

      </form>

    </div>
  );
}

export default ArticleForm;