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
    //patch en changeant le statut
    return {
      createdAt: new Date(),
      user: {
        _id: 5,
        email: "bob@gmail.com",
      },
      items: [
        {
          image:
            "https://assets.afcdn.com/recipe/20180326/78166_w1024h768c1cx2592cy1728.webp",
          name: "spagetthi",
          price: 3.99,
        },
        {
          image:
            "https://assets.afcdn.com/recipe/20180326/78166_w1024h768c1cx2592cy1728.webp",
          name: "spagetthi",
          price: 2.99,
        },
      ],
      status: "CANCELED",
    };
  }

  async getRestaurantOrders() {
    return [
      {
        createdAt: new Date(),
        user: {
          _id: 5,
          email: "bob@gmail.com",
        },
        items: [
          {
            image:
              "https://assets.afcdn.com/recipe/20180326/78166_w1024h768c1cx2592cy1728.webp",
            name: "spagetthi",
            price: 3.99,
          },
          {
            image:
              "https://assets.afcdn.com/recipe/20180326/78166_w1024h768c1cx2592cy1728.webp",
            name: "spagetthi",
            price: 2.99,
          },
        ],
        status: "PROCESSED",
      },
    ];
  }
}

export default new ApiService();
