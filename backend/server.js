
const express=require("express");
const connectDB = require("./config/db");
const userRouter=require('./routes/userProfileRoutes')
const suggestionRouter=require('./routes/SuggestionsRoutes');
const postRouter=require('./routes/PostsRoutes')
const storyRouter=require('./routes/StoryRoutes')
const followerRouter=require('./routes/FollowerRoutes');
const cors=require("cors");
const app=express();
const path=require('path')


const port=3002;


//Enable cors
app.use(cors({
    origin:"http://localhost:5173"
}));

//middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/assets',express.static(path.join(__dirname,'assets')));

// Mount the router
app.use('/api',userRouter);

app.use('/api',suggestionRouter);

app.use('/api',postRouter);

app.use('/api',storyRouter);

app.use('/api',followerRouter);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: "Server is working" });
});

//connect to db
connectDB();



app.listen(port,()=>{
    console.log(`server is running on the port ${port}`);
})