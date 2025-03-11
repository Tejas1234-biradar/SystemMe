import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        console.log("Authorization Header:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const token = authHeader.split(" ")[1];
        console.log("Extracted Token:", token);
        console.log("JWT Secret in Middleware:", process.env.JWT_SECRET);
        
        // Manually decode before verification
        const rawDecoded = jwt.decode(token, { complete: true });
        console.log("Raw Decoded Token:", rawDecoded);

        if (!rawDecoded || !rawDecoded.payload) {
            return res.status(400).json({ message: "Invalid token format." });
        }



        // Verify token and store result in `decoded`
         const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
         console.log("Verified Token:", decoded);

        if (!decoded.userId) {
            return res.status(400).json({ message: "Invalid token payload. Missing userId." });
        }

        req.user = decoded.userId;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(400).json({ message: "Invalid token.", error: error.message });
    }
};

export default authMiddleware;
