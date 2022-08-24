import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modal = document.querySelector('#modal');

function Modal({ onClick, children }) {
  useEffect(() => {
    document.addEventListener('keydown', listenerKeyDown);
    // console.log(onClick);
    return () => {
      document.removeEventListener('keydown', listenerKeyDown);
    };
  });

  const listenerKeyDown = e => {
    if (e.code === 'Escape') {
      // console.log(`esc`);
      // this.setState({ showModal: false });

      onClick();
    }
  };

  const onClikCloseBackDrop = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onClick();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={onClikCloseBackDrop}>
      <div className={css.modal}>{children}</div>
    </div>,
    modal
  );
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;

// class Modal extends Component {
//   state = {};

//   componentDidMount() {
//     window.addEventListener('keydown', this.listenerKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.listenerKeyDown);
//   }

//   listenerKeyDown = e => {
//     if (e.code === 'Escape') {
//       console.log(`esc`);
//       // this.setState({ showModal: false });

//       this.props.onClick();
//     }
//   };

//   onClikCloseBackDrop = ({ target, currentTarget }) => {
//     if (target === currentTarget) {
//       this.props.onClick();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={css.backdrop} onClick={this.onClikCloseBackDrop}>
//         <div className={css.modal}>{this.props.children}</div>
//       </div>,
//       modal
//     );
//   }
// }

// export default Modal;

// Modal.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   children: PropTypes.element.isRequired,
// };
