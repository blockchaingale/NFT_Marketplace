import styles from "./profile.module.css"
import Form from './form/form';

const Profile = () => {
    return (
        <div className={styles.profile}>
            <h3>Store Profile</h3>

            <Form />
        </div>
    );
}

export default Profile;
