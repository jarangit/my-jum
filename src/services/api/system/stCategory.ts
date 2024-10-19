import axiosInstance from "../axiosInstance"

export const StCategoryService = {
  async create(createStCategoryDto: any) {
    return ''
  },
  async findAll() {
    return await axiosInstance.get('/system/st-category')
  },
  findOne(id: any) {
    return `This action returns a #${id} stCategory`;
  },
  update(id: any, updateStCategoryDto: any) {
    return `This action updates a #${id} stCategory`;
  },
  remove(id: any) {
    return `This action removes a #${id} stCategory`;
  }
}