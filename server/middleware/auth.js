import jwt, {decode} from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const isNotGoogleAuth = token?.length < 500;

        let decodedData;

        if(token && isNotGoogleAuth) {
            decodedData = jwt.verify(token, "aryaop");
            req.userId = decodedData?.id;
        }
        else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub; //.sub is basically unique id for any google signed in user.
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;