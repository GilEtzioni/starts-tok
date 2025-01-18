import axios from 'axios';
import { useQuery, useQueryClient  } from '@tanstack/react-query';
import { CourseType } from '../../../../api/common/types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/', // ROOT URL
  withCredentials: true,
});

export default axiosInstance;