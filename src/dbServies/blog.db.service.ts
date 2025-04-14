import BlogModel from '../models/blog.model';

export class BlogDBService {
    static async getBlog(filters: any) {
        try {
            return await BlogModel.find();
        }
        catch(error) {
            return null;
        }
    }

    static async getBlogDetail(criteria: any) {
        return BlogModel.findOne(criteria);
    }

    static async addBlog(data: any) {
        return BlogModel.create(data);
    }

    static async updateBlog(criteria: any, data: any) {
        return BlogModel.updateOne(criteria, data);
    }

    static async deleteBlog(criteria: any) {
        return BlogModel.deleteOne(criteria);
    }
}