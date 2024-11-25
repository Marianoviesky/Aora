
import { Client,Account,ID,Avatars,Databases, Query} from 'react-native-appwrite';
// Init your React Native SDK

export const config = {
    endpoint:'https://cloud.appwrite.io/v1',
    platform : 'com.viesky.aora',
    projectId : '66b48275003748b97e9d',
    database :'66b4858e00389dcabe06',
    userCollectionId:'66b4865b0018239a78e6',
    videoCollectionId:'66b486d80013053a427b',
    storageId:'66b48ab7003c07f13fcc',
}


const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);


// Register User
export const createUser = async (email, password, username)=>{
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error; 

        const avatarUrl = avatars.getInitials(username);

        await signIn(email,password);

        const newUser = await databases.createDocument(
            config.database,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar : avatarUrl
            }
        )

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

}

export const signIn =  async(email,password)=>{
    try {
        const session = await account.createEmailPasswordSession(email,password)
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getCurrentUser = async ()=>{
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;


        const currentUser = await databases.listDocuments(
            config.database,
            config.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
        Alert
    }
}

export const getAllPosts = async ()=>{
    try {
        const posts = await databases.listDocuments(
            config.database,
            config.videoCollectionId
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getLatestPosts = async ()=>{
    try {
        const posts = await databases.listDocuments(
            config.database,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt',Query.limit(7))]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}



 //Curiosity

// export const userId = async ()=>{
//     try {
//         const userOnline = await databases.listDocuments(
//             config.database,
//             config.userCollectionId,
//         )

//         return userOnline.documents;
//     } catch (error) {
//         throw Error(error);
//     }
// }
// export const sessin = account.getSession(sess);