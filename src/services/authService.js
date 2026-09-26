import { INITIAL_USER, TEACHER_USER } from '../data/mockData';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const AUTH_STORAGE_KEY = 'continued_current_user';

export const authService = {
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed reading user session:', e);
    }
    // Default to student user for seamless initial experience
    return INITIAL_USER;
  },

  async login(email, password, preferredRole = 'student') {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return { success: true, user: data.user };
      } catch (err) {
        console.warn('Supabase login error, falling back to mock authentication:', err.message);
      }
    }

    // Mock Login Logic
    const user = preferredRole === 'teacher' ? { ...TEACHER_USER, email } : { ...INITIAL_USER, email };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  async signup(name, email, password, role = 'student') {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name, role } },
        });
        if (error) throw error;
        return { success: true, user: data.user };
      } catch (err) {
        console.warn('Supabase signup error, falling back to mock authentication:', err.message);
      }
    }

    // Mock Signup
    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role,
      department: 'Computer Science & Engineering',
      avatar: role === 'teacher' ? TEACHER_USER.avatar : INITIAL_USER.avatar,
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  switchRole(role) {
    const target = role === 'teacher' ? TEACHER_USER : INITIAL_USER;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(target));
    return target;
  },
};
