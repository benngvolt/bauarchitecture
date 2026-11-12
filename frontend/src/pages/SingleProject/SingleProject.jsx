
import './SingleProject.scss';
// import React, { useContext } from 'react'

import { ProjectsContext } from '../../utils/ProjectsContext';
import { useParams } from 'react-router-dom';
import CaptionBox from '../../components/CaptionBox/CaptionBox';
import CaptionTypology from '../../components/CaptionTypology/CaptionTypology';
import ImageBox from '../../components/ImageBox/ImageBox';
import React, { useContext, useState, useEffect } from 'react';
import { API_URL } from '../../utils/constants';

import DOMPurify from 'dompurify';

function SingleProject() {
    const { displayNavSection, setDisplayNavSection } = useContext(ProjectsContext);

    const [singleProject, setSingleProject] = useState(null);
    const [selectedSketchIndex, setSelectedSketchIndex] = useState(0);
    const [handleDisplayCaptionBox, setHandleDisplayCaptionBox] = useState(false);
    const [handleDisplayImageBox, setHandleDisplayImageBox] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);

    const { id } = useParams();

    const getMediaUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${API_URL}${url}`;
    };

    useEffect(() => {
        setDisplayNavSection(false);
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/api/projects/${id}`)
            .then((res) => res.json())
            .then((data) => {
                window.scrollTo(0, 0);
                setSingleProject(data);
            })
            .catch((error) => console.log(error.message));
    }, [id]);

    const cleanedDescription = DOMPurify.sanitize(singleProject?.description);

    function openCaptionBox(index) {
        setHandleDisplayCaptionBox(true);
        setSelectedSketchIndex(index);
    }

    return (
        <main>
            {singleProject && (
                <div className='singleProject'>
                    <section className='singleProject_datasContainer'>
                        <article className='singleProject_datasContainer_datasBox'>
                            <h3 className='singleProject_datasContainer_datasBox_title'>
                                {singleProject.title}
                            </h3>

                            <div className='singleProject_datasContainer_datasBox_infos'>
                                {(singleProject.projectType || singleProject.location) && (
                                    <p className='singleProject_datasContainer_datasBox_infos_item singleProject_datasContainer_datasBox_infos_item--type'>
                                        {[singleProject.projectType, singleProject.location]
                                            .filter(Boolean)
                                            .join(' · ')}
                                    </p>
                                )}

                                {singleProject.surface && (
                                    <p className='singleProject_datasContainer_datasBox_infos_item'>
                                        Surface : {singleProject.surface}
                                    </p>
                                )}

                                {singleProject.price && (
                                    <p className='singleProject_datasContainer_datasBox_infos_item'>
                                        Montant des travaux : {singleProject.price}
                                    </p>
                                )}
                            </div>
                        </article>

                        <div className='singleProject_datasContainer_split'>
                            {cleanedDescription && (
                                <div
                                    className='singleProject_datasContainer_split_text'
                                    dangerouslySetInnerHTML={{
                                        __html: cleanedDescription,
                                    }}
                                />
                            )}

                            {singleProject.images?.length > 0 && (
                                <div className='singleProject_datasContainer_split_images'>
                                    {singleProject.images.map((image, index) => (
                                        <img
                                            key={image._id || `image_${index}`}
                                            className='singleProject_datasContainer_split_image'
                                            src={getMediaUrl(image.imageUrl)}
                                            alt={`${singleProject.title} ${index + 1}`}
                                            onClick={() => {
                                                setSelectedImageUrl(getMediaUrl(image.imageUrl));
                                                setHandleDisplayImageBox(true);
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {singleProject.sketches?.length > 0 && (
                            <div className='singleProject_datasContainer_sketches'>
                                <div className='singleProject_datasContainer_sketches_grid'>
                                    {singleProject.sketches.map((sketch, index) => (
                                        <div
                                            key={sketch._id || `sketch_${index}`}
                                            className={`singleProject_datasContainer_sketches_grid_image singleProject_datasContainer_sketches_grid_image_${index}`}
                                            onClick={() => {
                                                openCaptionBox(index);
                                            }}
                                        >
                                            <img
                                                className={
                                                    sketch.imageUrl?.endsWith('.png')
                                                        ? 'singleProject_datasContainer_sketches_grid_image_png'
                                                        : 'singleProject_datasContainer_sketches_grid_image_other'
                                                }
                                                src={getMediaUrl(sketch.imageUrl)}
                                                alt={`croquis ${index + 1}`}
                                            />

                                            <p className='singleProject_datasContainer_sketches_grid_index'>
                                                #{index + 1}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {handleDisplayCaptionBox === true && (
                                    <CaptionBox setHandleDisplayCaptionBox={setHandleDisplayCaptionBox}>
                                        <CaptionTypology
                                            sketches={singleProject.sketches}
                                            index={selectedSketchIndex}
                                            isPictureDisplayed={
                                                singleProject.sketches[selectedSketchIndex]?.isPictureDisplayed ?? true
                                            }
                                        />
                                    </CaptionBox>
                                )}
                            </div>
                        )}
                    </section>

                    {handleDisplayImageBox && selectedImageUrl && (
                        <ImageBox setHandleDisplayImageBox={setHandleDisplayImageBox}>
                            <img
                                className='singleProject_imageBoxImage'
                                src={selectedImageUrl}
                                alt={singleProject.title}
                                onClick={(event) => event.stopPropagation()}
                            />
                        </ImageBox>
                    )}
                </div>
            )}
        </main>
    );
}

export default SingleProject;