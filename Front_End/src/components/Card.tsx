import './Card.css';
import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonTitle,
    IonToolbar,
    useIonActionSheet
} from '@ionic/react';
import {chatboxEllipsesOutline, thumbsDownOutline, thumbsUpOutline} from 'ionicons/icons';

import {faker} from '@faker-js/faker';
import React, {useState} from "react";
import axios from "axios";

interface Props {
    postData?: any
    // any props that come into the component
}

const Card = ({postData}: Props) => {
    const [present] = useIonActionSheet();
    const [isOpen, setIsOpen] = useState(false);
    const [dislikes, setDislikes] = useState({[postData.id]: 0});
    const [likes, setLikes] = useState({[postData.id]: 0});
    const [comments, setComments] = useState({[postData.id]: ['Handsome man']});

    postData.username = 'jay232'

    const UNIX2String = (unixTime: number) => {
        const date = new Date(unixTime * 1000);
        return date.toLocaleDateString()
    }

    const addLikes = (postId: number) => {
        setLikes({[postData.id]: likes[postData.id] + 1})
        axios.post('https://api.weasoft.com/likes', {
            postId
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const removeLikes = (postId: number) => {
        setDislikes({[postData.id]: dislikes[postData.id] + 1})
        axios.post('https://api.weasoft.com/likes', {
            postId
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const promptComment = (postId: number) => {
        const input = prompt('Write your comment below :)');
        console.log(input)
        if (input !== null && input !== '') {
            setComments({[postId]: [...comments[postId], input]})
        }
    }

const showComments = async () => {
    setIsOpen(!isOpen)
}

return (
    <IonCard>
        <IonModal isOpen={isOpen}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                    </IonButtons>
                    <IonTitle>Comments</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <form>
                    <IonList>
                        {comments[postData.id].length > 0 ? comments[postData.id].map((el, idx) => {
                            return <IonItem>
                                {el}
                            </IonItem>
                        }) : 'No comments yet'}

                        <section>
                            {/*/!*<IonButton id="UploadBtn" style={{ height: "80px", width: "80px" }} color="light" onClick={popup}>*!/*/}
                            {/*/!*    <IonIcon icon={addOutline}></IonIcon>*!/*/}
                            {/*/!*</IonButton>*!/*/}
                            {/*/!*<p>Only jpeg and png allowed.</p>*!/*/}
                            {/*<br />*/}
                            <IonButton color='success' expand="block" id="send"
                                       onClick={() => promptComment(postData.id)}>
                                <IonIcon icon={chatboxEllipsesOutline}></IonIcon> &nbsp;
                                Add a comment
                            </IonButton>
                        </section>
                    </IonList>
                </form>
            </IonContent>
        </IonModal>
        <IonCardContent>
            <IonItem class="no_border">
                <IonAvatar slot="start">
                    <img id="avatar"
                         src={'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'}
                         alt={`${faker.name.firstName}'s Avatar`}/>
                </IonAvatar>
                <IonLabel>
                    <IonCardSubtitle>{postData.username}</IonCardSubtitle>
                    <p>{UNIX2String(postData.date)}</p>
                </IonLabel>
                <div className="chip"
                         style={{backgroundImage: "url('/assets/a.jpg')", backgroundSize: "100% 100%"}}>
                        <IonLabel color="primary"
                                  style={{fontSize: "small"}}><b>{postData.happiness + "% Happy"}</b></IonLabel>
                    </div>
                </IonItem>

                <img src={`https://api.weasoft.com/imgs/${postData.id}`} alt={'happiEee :)'}/>
                <div>
                </div>
                <br/>
                {postData.description}.
                <br/>
                <br/>
                <IonIcon icon={thumbsUpOutline}
                         onClick={() => addLikes(postData.id)}
                         style={{cursor: 'pointer'}}>
                </IonIcon>

                {likes[postData.id]} &nbsp;&nbsp;


                <IonIcon icon={thumbsDownOutline}
                         onClick={() => removeLikes(postData.id)}
                         style={{cursor: 'pointer'}}>
                </IonIcon>

            {dislikes[postData.id]} &nbsp;&nbsp;

            <IonIcon icon={chatboxEllipsesOutline}
                // onClick={() => setComments({[postData.id]: comments[postData.id]+1})}
                     onClick={() => showComments()}
                     style={{cursor: 'pointer'}}>
            </IonIcon>


            {comments[postData.id].length} &nbsp;&nbsp;
            <span style={{float: "right", fontSize: "20px"}}>
                    <IonIcon name="paper-plane-outline"/>
                </span>
        </IonCardContent>
        </IonCard>
    );
};

export default Card;
