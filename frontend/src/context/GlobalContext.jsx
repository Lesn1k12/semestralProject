import React, { useContext, useState } from "react"
import authService from './auth/AuthService';
import axios from 'axios'

const BASE_URL = "http://localhost:8000/";

const GlobalContext = React.createContext()

export const ContextProvider = ({children}) => {

    const [token, setToken] = useState(null);
    const [expenses, setExpenses] = useState([])
    const [incomes, setIncomes] = useState([])
    const [transaction, setTransaction] = useState([])
    const [error, setError] = useState(null)


    const addTransaction = async (transaction) => {
        try {
            const token = authService.getTokenFromLocalStorage();

            const response = await axios.post(`${BASE_URL}users/post_transaction`, transaction, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            // console.log(response)            
            if (response && response.data) {
                // Дії, якщо відповідь успішна
                // console.log("Success:", response.data);
            } else {
                console.error("Invalid response:", response);
            }

            getTransaction();
        } catch (error) {
            console.error("Error:", error);
            console.log("Full error object:", error);
            setError(error.response?.data?.message || "Something went wrong");
        }
    }


    const getTransaction = async () => {
        try {
          const token = authService.getTokenFromLocalStorage();
          const response = await axios.get(`${BASE_URL}users/get_transactions`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
      
          console.log("danni:", response);
      
          // Перевірити, чи отримано відповідь з успіхом
          if (response && response.data) {
            // console.log("Success:", response.data);
            // Додаємо отримані дані до стану або робимо інші дії з ними
            const transactions = response.data;

            const expenses = transactions.filter(transaction => transaction.amount < 0);
            const incomes = transactions.filter(transaction => transaction.amount > 0);

            setExpenses(expenses);
            setIncomes(incomes);

            // console.log("дохід:",incomes)
            // console.log("витрати:",expenses)

          } else {
            console.error("Invalid response:", response);
          }
        } catch (error) {
          console.error("Error:", error);
          console.log("Full error object:", error);
          setError(error.response?.data?.message || "Something went wrong");
        }
    }

     //видалення транзакції
    const deleteTransaction = async (id) => {
      try {
        const token = authService.getTokenFromLocalStorage();
        const response = await axios.delete(`${BASE_URL}users/delete_transaction/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        console.log("danni:", response);
    
        // Перевірити, чи отримано відповідь з успіхом
        if (response && response.data) {
          // Додаємо отримані дані до стану або робимо інші дії з ними
          const transaction = response.data;
          console.log("transaction:",transaction)
        } else {
          console.error("Invalid response:", response);
        }
      } catch (error) {
        console.error("Error:", error);
        console.log("Full error object:", error);
        setError(error.response?.data?.message || "Something went wrong");
      }
    }

    //рахування загального доходу
    const total = () => {
      let total = 0;
      incomes.forEach((income) =>{
          total = total + income.amount
      })

      return total;
    }

    //історія транзакцій
    const transactionHistory = () => {
      const history = [...incomes]
      history.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt)
      })

      return history
  }

     //отримання предикта
    const getPredict = async () => {
      try {
        const token = authService.getTokenFromLocalStorage();
        const response = await axios.get(`${BASE_URL}users/forecast_transaction`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        console.log("danni:", response);
    
        // Перевірити, чи отримано відповідь з успіхом
        if (response && response.data) {
          // Додаємо отримані дані до стану або робимо інші дії з ними
          const predict = response.data;
          console.log("предикт:",predict)
        } else {
          console.error("Invalid response:", response);
        }
      } catch (error) {
        console.error("Error:", error);
        console.log("Full error object:", error);
        setError(error.response?.data?.message || "Something went wrong");
      }
    }

    const sendMail = () => {
      try {
          const token = authService.getTokenFromLocalStorage();
          const response = axios.get(`http://127.0.0.1:8000/users/total_mail/`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
      } catch (error) {
          console.error("Error:", error);
      }
    }

    //отримання данних юзера 
    const getUser = async () => {
      try {
        const token = authService.getTokenFromLocalStorage();
        const response = await axios.get(`${BASE_URL}users/get_userdata/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        console.log("danni:", response);
    
        // Перевірити, чи отримано відповідь з успіхом
        if (response && response.data) {
          // Додаємо отримані дані до стану або робимо інші дії з ними
          const user = response.data;
          console.log("user:",user)
        } else {
          console.error("Invalid response:", response);
        }
      } catch (error) {
        console.error("Error:", error);
        console.log("Full error object:", error);
        setError(error.response?.data?.message || "Something went wrong");
      }
    }

    //створити актив
    const createAsset = async () => {
      try {
          const token = authService.getTokenFromLocalStorage();
          const response = await axios.post(`${BASE_URL}users/create_actives/`, asset, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          });

          if (response && response.data) {
              console.log("Success:", response.data);
          } else {
              console.error("Invalid response:", response);
          }
      } catch (error) {
          console.error("Error:", error);
          console.log("Full error object:", error);
          setError(error.response?.data?.message || "Something went wrong");
      }
    }

    //видалити актив
    const deleteAsset = async (id) => {
      try {
          const token = authService.getTokenFromLocalStorage();
          const response = await axios.delete(`${BASE_URL}users/delete_actives/`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });

          if (response && response.data) {
              console.log("Success:", response.data);
          } else {
              console.error("Invalid response:", response);
          }
      } catch (error) {
          console.error("Error:", error);
          console.log("Full error object:", error);
          setError(error.response?.data?.message || "Something went wrong");
      }
    }

    //редагувати актив
    const editAsset = async (id) => {
      try {
          const token = authService.getTokenFromLocalStorage();
          const response = await axios.put(`${BASE_URL}users/edit_actives/`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
          });

          if (response && response.data) {
              console.log("Success:", response.data);
          } else {
              console.error("Invalid response:", response);
          }
      } catch (error) {
          console.error("Error:", error);
          console.log("Full error object:", error);
          setError(error.response?.data?.message || "Something went wrong");
      }

    }

    //отримати останній актив
    const getLastAsset = async () => {
      try {
          const token = authService.getTokenFromLocalStorage();
          const response = await axios.get(`${BASE_URL}users/get_actives/`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });

          if (response && response.data) {
              console.log("Success:", response.data);
          } else {
              console.error("Invalid response:", response);
          }
      } catch (error) {
          console.error("Error:", error);
          console.log("Full error object:", error);
          setError(error.response?.data?.message || "Something went wrong");
      }
    }

    //отримати історію актива
    const getAssetHistory = async () => {
      try {
          const token = authService.getTokenFromLocalStorage();
          const response = await axios.get(`${BASE_URL}users/get_price_history/`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });

          if (response && response.data) {
              console.log("Success:", response.data);
          } else {
              console.error("Invalid response:", response);
          }
      } catch (error) {
          console.error("Error:", error);
          console.log("Full error object:", error);
          setError(error.response?.data?.message || "Something went wrong");
      }
    }

  return (
    <GlobalContext.Provider value={{
          addTransaction,
          getTransaction,
          incomes,
          deleteTransaction,
          total,
          transactionHistory,
          error,
          setError,
          sendMail,
          getPredict,
          getUser,
          createAsset,
          deleteAsset,
          editAsset,
          getLastAsset,
          getAssetHistory
      }}>
          {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () =>{
  return useContext(GlobalContext)
}


