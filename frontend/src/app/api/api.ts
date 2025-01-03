import axios from 'axios';

// Axios 기본 인스턴스 설정
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Django 서버의 Notes API URL
  // withCredentials: true, // 인증이 필요한 경우
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${localStorage.getItem('access_token')}`, // 토큰 추가
  },
});

// 인증 토큰 추가
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: refreshToken,
          });
          const { access } = response.data;
          localStorage.setItem('accessToken', access);

          // 이전 요청을 다시 시도
          error.config.headers.Authorization = `Bearer ${access}`;
          return api.request(error.config);
        } catch (err) {
          console.error('Token refresh failed:', err);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
    }
    return Promise.reject(error);
  }
);


export default api;


// 게스트모드

const createGuestAccount = async () => {
  const response = await axios.post('http://127.0.0.1:8000/api/users/', {
    is_guest: true,
  });
  return response.data;
};

// 소셜로그인

const handleSocialLogin = async (token) => {
  localStorage.setItem('accessToken', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// 시음 노트 관련 API

// 1. 모든 노트 가져오기
export const fetchNotes = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// 2. 특정 노트 가져오기
export const fetchNoteById = async (id: number) => {
  try {
    const response = await api.get(`/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching note with ID ${id}:`, error);
    throw error;
  }
};

// 3. 노트 생성
export const createNote = async (noteData: any) => {
  try {
    const response = await api.post('/tasting-notes/', noteData);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// 4. 노트 업데이트
export const updateNote = async (id: number, updatedNote: any) => {
  try {
    const response = await api.put(`/${id}/`, updatedNote);
    return response.data;
  } catch (error) {
    console.error(`Error updating note with ID ${id}:`, error);
    throw error;
  }
};

// 5. 노트 삭제
export const deleteNote = async (id: number) => {
  try {
    await api.delete(`/${id}/`);
  } catch (error) {
    console.error(`Error deleting note with ID ${id}:`, error);
    throw error;
  }
};


// 캘린더 관련 API

// 6. 캘린더 노트 조회
export const fetchCalendarNotes = async () => {
  try {
    const response = await api.get('/calendar/');
    return response.data;
  } catch (error) {
    console.error('Error fetching calendar notes:', error);
    throw error;
  }
};