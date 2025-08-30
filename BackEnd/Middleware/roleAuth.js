import HttpError from '../Models/http-error.js';

const checkRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const { role } = req.userData; // This comes from the auth middleware
      
      if (!allowedRoles.includes(role)) {
        const error = new HttpError('Access denied. Insufficient permissions.', 403);
        return next(error);
      }
      
      next();
    } catch (err) {
      const error = new HttpError('Authorization failed!', 500);
      return next(error);
    }
  };
};

// Define role hierarchies
export const adminRoles = [
  'clerical-staff',
  'technical-assistant', 
  'fire-safety-inspector',
  'assistant-divisional-fire-officer',
  'station-fire-officer',
  'divisional-fire-officer',
  'deputy-chief-fire-officer',
  'chief-fire-officer'
];

export const userRoles = ['user', ...adminRoles];

export default checkRole;
