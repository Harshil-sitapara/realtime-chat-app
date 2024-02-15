declare module "cloudinary" {
    export interface CloudinaryConfig {
      cloud_name: string;
      api_key: string;
      api_secret: string;
    }
  
    export interface CloudinaryInstance {
      config(config: CloudinaryConfig): void;
      uploader: {
        upload(file: string, options?: any): Promise<any>;
      };
      // Add other methods as needed
    }
  
    const cloudinary: CloudinaryInstance;
    export default cloudinary;
  }
  