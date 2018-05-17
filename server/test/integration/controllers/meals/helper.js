/* eslint import/no-extraneous-dependencies: off */
import chai from 'chai';

import MealController from '../../../../src/controllers/MealController';
import {
  seedUsers, seedMeals
} from '../../../../src/seedFiles';
import db from '../../../../src/models';

export const { expect } = chai;
export const defaultUser = seedUsers[0];
export const defaultUser2 = seedUsers[1];
export const defaultMeal = seedMeals[0];
export const defaultMeal2 = seedMeals[1];
export const deleteMeal = seedMeals[3];
export const mealController = new MealController(db.Meal);