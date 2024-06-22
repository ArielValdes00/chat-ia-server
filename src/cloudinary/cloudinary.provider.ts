import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
        cloud_name: "dnczjmsbt",
        api_key: "188544876641381",
        api_secret:
          "n-9Jjtrp93wiXEsY_EdPrWCWiBE",
    });
  },
};
