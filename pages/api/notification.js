import {
    ConnectDB,
    insertDocument,
    getDocument,
    getUserProfile,
    updateProfileData,
    getNotificationFromEmail,
    deleteAllNotification
} from "@/database/db-util";
import { getServerSession } from "next-auth";
import { authNext } from "./auth/[...nextauth]";

const handler = async (req, res) => {
    const session = await getServerSession (req,res, authNext);

    if (!session) {
        res.status(401).json("Not Authenticated!");
        return;
    }
    
    const userEmail = session.user.email;
    let client;
    
    try {
        client = await ConnectDB();
      } catch (e) {
        res.status(500).json({ message: "Cannot connect do database" });
        return;
      }

      if (req.method === "GET") {
        try {
            const message = await getNotificationFromEmail(client, userEmail);
            res.status(200).json({user : message});
        } catch (error) {
            res.status(500).json({message : "Failed to get data"})
        }
      }

      if (req.method === "POST") {
        const data = req.body;
        const {email,message,tanggal} = data;
        const newNotification = {email:email,message:message,tanggal:tanggal};
        console.log(newNotification);
        const result = await insertDocument(client,"Notification",newNotification);
        client.close();
        res.status(201).json({message: "Notification Sent"});
      }

      if(req.method === "DELETE") {
        try {
        const result = await deleteAllNotification(client, userEmail);
        res.status(201).json({message: result});
        console.log("masuk 200 bray");
        } catch(error) {
          console.log("masuk 500 bray");
          res.status(500).json({message: "Failed to delete notification"})
        }
      }
}

export default handler;