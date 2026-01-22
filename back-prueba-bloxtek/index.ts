import app from "./core/app";
import { config } from "./core/config";



app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});