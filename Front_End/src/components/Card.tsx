import './Card.css';
import {IonAvatar, IonCard, IonCardContent, IonCardSubtitle, IonIcon, IonItem, IonLabel} from '@ionic/react';
import {chatboxEllipsesOutline, thumbsUpOutline, thumbsDownOutline} from 'ionicons/icons';

import {faker} from '@faker-js/faker';
import React, {useState} from "react";
import axios from "axios";

interface Props {
    postData?: any
    // any props that come into the component
}

const Card = ({postData}: Props) => {

    const [dislikes, setDislikes] = useState({[postData.id]: 0})
    const [likes, setLikes] = useState({[postData.id]: 0})
    const [comments, setComments] = useState({[postData.id]: 0})

    postData.username = 'jay232'

    const UNIX2String = (unixTime: number) => {
        const date = new Date(unixTime * 1000);
        return date.toLocaleDateString()
    }

    const addLikes = (postId: number) => {
        setLikes({[postData.id]: likes[postData.id]+1})
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
        setDislikes({[postData.id]: dislikes[postData.id]+1})
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

    return (
        <IonCard>
            <IonCardContent>
                <IonItem class="no_border">
                    <IonAvatar slot="start">
                        <img id="avatar" src={'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'} alt={`${faker.name.firstName}'s Avatar`}/>
                    </IonAvatar>
                    <IonLabel>
                        <IonCardSubtitle>{postData.username}</IonCardSubtitle>
                        <p>{UNIX2String(postData.date)}</p>
                    </IonLabel>
                    {/* <div className="chip">
                        <div className='filledChip'> */}
                    <div className="chip"
                         style={{backgroundImage: "url('/assets/a.jpg')", backgroundSize: "100% 100%"}}>
                        <IonLabel color="primary"
                                  style={{fontSize: "small"}}><b>{postData.happiness + "% Happy"}</b></IonLabel>
                    </div>
                    {/* </div>
                    </div> */}
                </IonItem>

                <img src={`https://api.weasoft.com/imgs/${postData.id}`} alt={'happiEee :)'}/>
                {/* <div style={{backgroundColor:"red"}}>................</div> */}
                <div>
                    {/* <img id="avatar" src={faker.image.avatar()}/> */}
                </div>
                <br/>
                {postData.description}.
                <br/>
                <br/>
                {/* <div className='likeContainer'><div className="Like"><IonIcon icon={thumbsUpOutline}></IonIcon>{Math.round(Math.random() * 100)}</div></div>
                <div className='likeContainer'><div className="Comment"><IonIcon icon={chatboxEllipsesOutline}></IonIcon>{Math.round(Math.random() * 10)}</div></div> */}
                {/* <IonCardContent style="font-size:18px;font-weight:bold;" id="mycard"> */}
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
                         onClick={() => setComments({[postData.id]: comments[postData.id]+1})}
                         style={{cursor: 'pointer'}}>
                </IonIcon>


                {comments[postData.id]} &nbsp;&nbsp;
                {/* <IonIcon icon={bookmarkOutline}></IonIcon> {Math.round(Math.random()*50)} &nbsp; */}
                <span style={{float: "right", fontSize: "20px"}}>
                    <IonIcon name="paper-plane-outline"/>
                </span>
            </IonCardContent>
            {/* </IonCardContent> */}
        </IonCard>
    );
};

export default Card;
