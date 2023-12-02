import AxiosInstance from "./AxiosInstance";

class ApiService {
  async getLoggedUser() {
    const { data } = await AxiosInstance.get(`/users/@me`);
    return data;
  }

  async getRestaurantAccounts() {
    const { data } = await AxiosInstance.get(`/restaurants`);
    return data;
  }

  async createRestaurantUser(restaurantUser) {
     const { data } = await AxiosInstance.post(`/restaurants`, {
      data: restaurantUser
    }); 
    return data;
  }
  async updateRestaurantUser(restaurantUser) {
     const { data } = await AxiosInstance.patch(`/restaurants/${restaurantUser._id}`, {
      data: restaurantUser
    }); 
    return data;
  }

  async deleteRestaurant(id) {
    const { data } = await AxiosInstance.delete(`/restaurants/${id}`);
    return data;
  }

  async getPlate(plateId) {
    const { data } = await AxiosInstance.get(`/plates/${plateId}`); 
    return data;
  }

  async updatePlate(plateId, newPlate) {
    const { data } = await AxiosInstance.patch(`/plates/${plateId}`, {
      data: newPlate
    });
    return data;
  }

  async createPlate(newPlate) {
    const loggedUser = await this.getLoggedUser()
    if(newPlate.name != '' && newPlate.image != '' && newPlate.price != '') {
      try {
        const { data } = await AxiosInstance.post(`/restaurants/${loggedUser._id}/plates`, {
          data: newPlate
        }); 
        return data;
      } catch (error) {
        return error;
      }
    } else {
      throw new Error('All fields are required');
    }
  }

  async getRestaurantPlates() {
    const loggedUser = await this.getLoggedUser()
    const { data } = await AxiosInstance.get(`/restaurants/${loggedUser._id}/plates`);
    return data;
  }

  async cancelOrder(orderId) {
    const { data } = await AxiosInstance.patch(`/orders/${orderId}`, {
      data: {
        status: "CANCELED"
      }
    });
    return data;
  }

  async getRestaurantOrders() {
    const loggedUser = await this.getLoggedUser()
    const { data } = await AxiosInstance.get(`/restaurants/${loggedUser._id}/orders`);
    console.log(data)
    return data;
  }
}

export default new ApiService();
