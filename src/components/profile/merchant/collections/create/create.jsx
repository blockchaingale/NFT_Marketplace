import Form from './form/form';
import styles from "./create.module.css"

const Create = () => {
    return (
        <div className={styles.create}>
            <h3>Create New Item</h3>
            <Form />
        </div>
    );
}

export default Create;
