import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import css from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import getImages from './Pixabay-api';

function App() {
  const [arrImage, setArrImage] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (search === '') {
      return;
    }

    setLoading(true);

    getImages(search, page)
      .then(({ hits, total }) => {
        if (total === 0) {
          setArrImage([]);
          setLoading(false);
          setShowBtn(false);
          return Notiflix.Report.failure(
            'Not found',
            'Sorry, there are no images matching your search query. Please try again.',
            'Retry'
          );
        }
        if (total <= 12) {
          setShowBtn(false);
          setLoading(false);
          setArrImage([...hits]);
          return Notiflix.Notify.info(`Hooray! We found ${total} images.`);
        }
        Notiflix.Notify.info(`Hooray! We found ${total} images.`);
        setArrImage([...hits]);

        setShowBtn(true);
        setLoading(false);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    if (search === '' || page === 1) {
      return;
    }

    setLoading(true);
    getImages(search, page)
      .then(({ hits, total }) => {
        if (hits.length <= 12) {
          setShowBtn(false);
        }

        setArrImage(prevArr => [...prevArr, ...hits]);

        setShowBtn(true);
        setLoading(false);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, [page]);

  const onSubmitData = dataSearch => {
    setSearch(dataSearch);
    setPage(1);
  };

  const onClickAddImg = () => {
    setPage(prevState => prevState + 1);
  };

  const onClickToggleModal = () => {
    setShowModal(!showModal);
  };

  const renderImgInModal = ({ target }) => {
    onClickToggleModal();
    const { name } = target;
    setTitle(name);
  };

  return (
    <>
      <div className={css.App}>
        {showModal && (
          <Modal onClick={onClickToggleModal}>
            <img src={title} alt="" />
          </Modal>
        )}
        <Searchbar onSubmit={onSubmitData} />
        {arrImage && (
          <ImageGallery
            arrImage={arrImage}
            renderImgInModal={renderImgInModal}
          />
        )}
        {loading && <Loader />}
      </div>
      {showBtn && <Button onClickAdd={onClickAddImg} />}
    </>
  );
}

export default App;
