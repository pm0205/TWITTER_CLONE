var tweetIDCount = 0; 
var currentShowingTweet = -1; 
var currentShowingElement = null; 

const textareaPost = document.getElementById('textareaPost');

var currentUser = 'dr';

var users = {
    'alice': {name: 'lallice', profile: 'profile.png'},
    'dr': {name: 'doof', profile: 'profile2.png'}
};
var tweets = [];

document.querySelector('#create-post img').src = users[currentUser].profile;
document.querySelector('#profile img').src = users[currentUser].profile;

const tweetReplica = document.getElementById('tweet-replica');

const postButton = document.getElementById('postButton');
postButton.addEventListener('click', e => {
    const text = document.querySelector('#create-post textarea').value;
    if(text.length > 0) {
        newPost(currentUser, text);
        document.querySelector('#create-post textarea').value = '';
    }
});

document.getElementById('full-tweet-likes-icon').addEventListener('click', e => {
    const heart = document.getElementById('full-tweet-likes-icon');
        if(heart.classList.contains('fa-regular')) { // like tweet
            heart.classList.remove('fa-regular');
            heart.classList.add('fa-solid');
            heart.style.color = pink; 

            tweets[currentShowingTweet].likes.push(currentUser);
            console.log(tweets[currentShowingTweet]);

        } else { // dislike tweet 
            heart.classList.remove('fa-solid');
            heart.classList.add('fa-regular');
            heart.style.color = grey;

            const index = tweets[currentShowingTweet].likes.indexOf(currentUser);
            tweets[currentShowingTweet].likes.splice(index, 1);
            console.log(tweets[currentShowingTweet]);
                    
        }
});

const lightGrey = getComputedStyle(document.documentElement).getPropertyValue('--light-grey');
const grey = getComputedStyle(document.documentElement).getPropertyValue('--grey')
const pink = getComputedStyle(document.documentElement).getPropertyValue('--pink');

// setInterval(run, 1000);

function run() {
    if(textareaPost.value.length > 0) {
        textareaPost.style.color = lightGrey;
    }
}

newPost(currentUser, 'This is a test post.', 1);
newPost(currentUser, 'Anotha one', 1);
newPost(currentUser, 'hi', 1);

function showTweet(id) {
    document.getElementById('main-header').style.display = 'none';
    document.getElementById('tweet-header').style.display = 'flex';
    document.getElementById('create-post').style.display = 'none';
    document.getElementById('tweets').style.display = 'none';
    document.getElementById('full-tweet').style.display = 'block';

    currentShowingTweet = id; 
    const tweet = tweets[id];

    document.getElementById('full-tweet-name').innerHTML = users[tweet.username].name;
    document.getElementById('full-tweet-username').innerHTML = "@" + tweet.username;
    document.getElementById('full-tweet-profile').src = users[tweet.username].profile;

    document.querySelector('#full-tweet-content p').innerHTML = tweet.content;

    var noStatistic = true; 

    const amountOfLikes = tweet.likes.length;

    if(amountOfLikes == 0)
        document.getElementById('full-tweet-likes').style.display = 'none';
    else  {
        noStatistic = false; 
        document.getElementById('full-tweet-likes').style.display = 'block';

        if(amountOfLikes == 1)
            document.getElementById('full-tweet-likes').innerHTML = tweet.likes.length + " Like";
        else 
            document.getElementById('full-tweet-likes').innerHTML = tweet.likes.length + " Likes";

        const i = document.getElementById('full-tweet-likes-icon');  
        if(tweet.likes.indexOf(currentUser) > -1) {
            i.classList.remove('fa-regular');
            i.classList.add('fa-solid');
            i.style.color = pink;
        } else {
            i.classList.remove('fa-solid');
            i.classList.add('fa-regular');
            i.style.color = grey;
        }
    }

    if(noStatistic) 
        document.getElementById('full-tweet-statistic').style.display = 'none';
    else document.getElementById('full-tweet-statistic').style.display = 'flex';

    // comments ----------------------------------------

    const commentDiv = document.getElementById('full-tweet-comments');
    while(commentDiv.firstChild) {
        commentDiv.removeChild(commentDiv.firstChild);
    }

    if(tweet.comments.length > 0) {
        tweet.comments.forEach(index => {
            const obj = tweets[index];
            
            var clone = tweetReplica.cloneNode(true);
            const parent = document.getElementById('full-tweet-comments');

            parent.style.display = 'block';
            parent.prepend(clone);
            clone.style.display = 'flex';

            const div = clone.querySelector('.tweet-bottom-info').style.height = '20px';

            clone.querySelector('.tweet-left img').src = users[obj.username].profile;
            clone.querySelector('.tweet-name').innerHTML = users[obj.username].name;
            clone.querySelector('.tweet-username').innerHTML = "@" + obj.username;
            clone.querySelector('.tweet-post').innerHTML = obj.content;
            clone.querySelector('.tweet-post').style.fontSize = '16px';

            clone.addEventListener('click', e => {
                showTweet(index);
                currentShowingElement = clone; 
            });

            const likeDiv = clone.querySelector('.tweet-like');
            likeDiv.addEventListener('click', e => {
                e.stopPropagation();

                const heart = likeDiv.querySelector('i');
                if(heart.classList.contains('fa-regular')) { // like tweet
                    heart.classList.remove('fa-regular');
                    heart.classList.add('fa-solid');
                    likeDiv.style.color = pink; 

                    const likeP = likeDiv.querySelector('p');
                    const amountOfLikes = parseInt(likeP.innerHTML);
                    if(amountOfLikes == 0) 
                        likeP.style.visibility = 'visible';

                    likeP.innerHTML = amountOfLikes + 1;
                    for(var i = 0; i < tweets.length; i++) {
                        if(tweets[i].id == post.id) {
                            tweets[i].likes.push(currentUser);
                            console.log(tweets[i]);
                            break; 
                        }
                    }

                } else { // dislike tweet 
                    heart.classList.remove('fa-solid');
                    heart.classList.add('fa-regular');
                    likeDiv.style.color = grey;

                    const likeP = likeDiv.querySelector('p');
                    const amountOfLikes = parseInt(likeP.innerHTML);
                    if(amountOfLikes == 1) 
                        likeP.style.visibility = 'hidden';

                    likeP.innerHTML = amountOfLikes - 1;
                    for(var i = 0; i < tweets.length; i++) {
                        if(tweets[i].id == post.id) {
                            const index = tweets[i].likes.indexOf(currentUser);
                            tweets[i].likes.splice(index, 1);
                            console.log(tweets[i]);
                            break; 
                        }
                    }
                }
            });

            const commentDiv = clone.querySelector('.tweet-comment');
            commentDiv.addEventListener('click', e => {
                e.stopPropagation();
                comment(index);
            });
        });
    }
}

document.querySelector('#tweet-header i').addEventListener('click', e => { // go back to Home 
    document.getElementById('main-header').style.display = 'block';
    document.getElementById('tweet-header').style.display = 'none';
    document.getElementById('create-post').style.display = 'block';
    document.getElementById('tweets').style.display = 'block';
    document.getElementById('full-tweet').style.display = 'none';

    const i = currentShowingElement.querySelector('.tweet-like i');
    if(tweets[currentShowingTweet].likes.indexOf(currentUser) > -1) {
        i.classList.remove('fa-regular');
        i.classList.add('fa-solid');
        i.style.color = pink;
    } else {
        i.classList.remove('fa-solid');
        i.classList.add('fa-regular');
        i.style.color = grey;
    }

    const p = currentShowingElement.querySelector('.tweet-like p');
    p.innerHTML = tweets[currentShowingTweet].likes.length;
    if(tweets[currentShowingTweet].likes.length == 0) {
        p.style.display = 'none';
    } else p.style.display = 'block';

    document.getElementById('full-tweet-comments').style.display = 'none';
});

// Type: 1 for tweet, 2 for comment
function newPost(user, text, type) {
    var clone = tweetReplica.cloneNode(true);

    
    document.getElementById('tweets').prepend(clone);

    clone.style.display = 'flex';

    clone.querySelector('.tweet-left img').src = users[user].profile;
    clone.querySelector('.tweet-name').innerHTML = users[user].name;
    clone.querySelector('.tweet-username').innerHTML = "@" + user;
    clone.querySelector('.tweet-post').innerHTML = text;

    const d = new Date();

    const post = {id: tweetIDCount, username: user, time: d.getTime(), 
        content: text, comments: [], retweets: [], likes: []};
    tweets.push(post);

    clone.addEventListener('click', e => {
        showTweet(post.id);
        currentShowingElement = clone; 
    });

    const likeDiv = clone.querySelector('.tweet-like');
    likeDiv.addEventListener('click', e => {
        e.stopPropagation();

        const heart = likeDiv.querySelector('i');
        if(heart.classList.contains('fa-regular')) { // like tweet
            heart.classList.remove('fa-regular');
            heart.classList.add('fa-solid');
            likeDiv.style.color = pink; 

            const likeP = likeDiv.querySelector('p');
            const amountOfLikes = parseInt(likeP.innerHTML);
            if(amountOfLikes == 0) 
                likeP.style.visibility = 'visible';

            likeP.innerHTML = amountOfLikes + 1;
            for(var i = 0; i < tweets.length; i++) {
                if(tweets[i].id == post.id) {
                    tweets[i].likes.push(currentUser);
                    console.log(tweets[i]);
                    break; 
                }
            }

        } else { // dislike tweet 
            heart.classList.remove('fa-solid');
            heart.classList.add('fa-regular');
            likeDiv.style.color = grey;

            const likeP = likeDiv.querySelector('p');
            const amountOfLikes = parseInt(likeP.innerHTML);
            if(amountOfLikes == 1) 
                likeP.style.visibility = 'hidden';

            likeP.innerHTML = amountOfLikes - 1;
            for(var i = 0; i < tweets.length; i++) {
                if(tweets[i].id == post.id) {
                    const index = tweets[i].likes.indexOf(currentUser);
                    tweets[i].likes.splice(index, 1);
                    console.log(tweets[i]);
                    break; 
                }
            }
        }
    });

    const commentDiv = clone.querySelector('.tweet-comment');
    commentDiv.addEventListener('click', e => {
        e.stopPropagation();
        comment(post.id);
    });

    tweetIDCount++;
}

function comment(id) {
    currentShowingTweet = id;

    document.getElementById('comment-popup').style.display = 'block';
    document.getElementById('tint-overlay').style.display = 'block';

    const user = tweets[id].username; 

    document.getElementById('comment-popup-tweet-profile').src = users[user].profile;
    document.getElementById('comment-popup-name').innerHTML = users[user].name;
    document.getElementById('comment-popup-username').innerHTML = '@' + user;

    document.getElementById('comment-popup-time').innerHTML = "Now"; // TODO

    document.getElementById('comment-popup-content').innerHTML = tweets[id].content;
    document.querySelector('#comment-popup-replying-to a').innerHTML = '@' + tweets[id].username;

    document.getElementById('comment-popup-profile').src = users[currentUser].profile;
}

document.querySelector('#comment-popup-top i').addEventListener('click', e => {
    document.getElementById('comment-popup').style.display = 'none';
    document.getElementById('tint-overlay').style.display = 'none';
});

document.querySelector('#comment-popup-bottom button').addEventListener('click', e => {
    const text = document.querySelector('#comment-popup textarea').value;
    
    if(text.length > 0) {
        document.getElementById('comment-popup').style.display = 'none';
        document.getElementById('tint-overlay').style.display = 'none';

        const comment = tweetIDCount;
        tweets[currentShowingTweet].comments.push(comment);

        const d = new Date();

        const post = {id: tweetIDCount, username: currentUser, time: d.getTime(), 
            content: text, comments: [], retweets: [], likes: []};
        tweets.push(post);

        tweetIDCount++;

        document.querySelector('#comment-popup textarea').value = "";
    }
});