import classes from './Card.module.css';

const Card = (props) => {

  const cardClasses = `${classes.card} ${props.className ? props.className : ''}`
  
  return (
    <section className={cardClasses}>
      {props.children}
    </section>
  );
};

export default Card;
