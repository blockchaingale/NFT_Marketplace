import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../../../../helpers/utils";
import styles from "./userprofile.module.css"
import apiRequest from "../../../../helpers/connections";
import { notificationActions } from "../../../../store/notification/notification";
import { authSliceActions } from "../../../../store/auth/auth";

const Userprofile = () => {
    const user = useSelector((state) => state.auth.user);
    const auth = useSelector((state) => state.auth.loggedIn);
    const dispatch = useDispatch()
    const { dark } = useSelector(
        (state) => state.mode
    );
    const handleUpdate = async (e) => {
        e.preventDefault()
        dispatch(notificationActions.setNotify(true))
        const form = new FormData(e.target)
        
        try {
            const res = await apiRequest("user", form, "POST", auth)
            dispatch(authSliceActions.setUser(res.user));
            dispatch(notificationActions.setMessage("Update was succesful"))
        } catch (error) {
            if (error?.info?.error?.status === 422) {
                dispatch(notificationActions.setMessage(error?.info?.error?.message));
            } else {
                dispatch(notificationActions.setMessage("Something went wrong"));
            }
        }

    }


    const startVerification = () => {
        //request to get token

        window.ComplyCube.mount({
            token: '<YOUR_WEB_SDK_TOKEN>',
            containerId: 'complycube-mount',
            stages: [
                {
                    name: "intro",
                    options: {
                        heading: "We need to verify your identity",
                        message: [
                            "In order to open an account, we need to check a few things.",
                            "This will take only a moment",
                        ],
                        startButtonText: "Start Verification"
                    },
                },
                "userConsentCapture",
                {
                    name: "documentCapture",
                    options: {
                        crossDeviceOnly: true,
                        documentTypes: {
                            passport: true,
                            driving_license: true,
                            national_identity_card: true,
                            residence_permit: {
                                country: "GB",
                            },
                        },
                    },
                },
                {
                    name: "faceCapture",
                    options: {
                        mode: "video"
                    },
                },
                {
                    name: "poaCapture",
                    options: {
                        documentTypes: {
                            bank_statement: true,
                            utility_bill: true,
                        },
                    },
                },
                {
                    name: "completion",
                    options: {
                        heading: "Thank you for completing the process",
                        message: ["we will get in touch shortly"]
                    },
                },
            ],
            branding: {
                appearance: {
                    primaryButtonColor: 'red',
                },
                logo: {
                    lightLogoUrl: getImageUrl("logo.gif"),
                    darkLogoUrl: getImageUrl("logo.gif"),
                }
            },
            onComplete: function () {
                // Using the data attributes returned, request your
                // backend server to perform the necessary ComplyCube checks
                console.info('Capture complete');
            },
            onModalClose: function () {
                // Handle the modal closure attempt
            },
            onError: function ({ type, message }) {
                if (type === 'token_expired') {
                    // Request a new SDK token
                } else {
                    // Handle other errors
                    console.log(message);
                }
            }
        });

    }

    return (
        <div className={`${styles.profile} ${dark ? styles.dark : ""}`} >
            <h3>Edit Profile</h3>
            <form onSubmit={handleUpdate} className={styles.form}>
                <label>
                    First name
                    <input type="text" placeholder={user.first_name} name="first_name" />
                </label>
                <label>
                    Last name
                    <input type="text" placeholder={user.last_name} name="last_name" />
                </label>
                <label>
                    Email
                    <input type="email" value={user.email} readOnly />
                </label>
                <label>
                    Password
                    <input type="password" placeholder="**********" />
                </label>
                <label>
                    Street
                    <input type="text" placeholder={user.street} name="street" />
                </label>
                <label>
                    City
                    <input type="text" placeholder={user.city} name="city" />
                </label>
                <label>
                    State
                    <input type="text" placeholder={user.state} name="state" />
                </label>
                <label>
                    Country
                    <input type="text" placeholder={user.country} name="country" />
                </label>
                <label>
                    Postal
                    <input type="number" placeholder={user.postal} name="postal" />
                </label>
                <label>
                    Upload Avatar
                    <div className={styles.upload}>
                        <img src={getImageUrl("upavatar.png")} alt="upavatar" />
                        <input type="file" name="image" />
                    </div>
                </label>
                <button>Save</button>
            </form>
            <div id="complycube-mount"></div>
            {!user.kyc ? <div className={styles.form}>
                <button onClick={startVerification}>
                    Start verification
                </button>
            </div> : <></>}

        </div>
    );
}

export default Userprofile;
