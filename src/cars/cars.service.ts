import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Ford',
      model: 'Mustang',
    },
    {
      id: uuid(),
      brand: 'Chevrolet',
      model: 'Camaro',
    },
    {
      id: uuid(),
      brand: 'Dodge',
      model: 'Charger',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOne(id: string) {
    const car = this.cars.find(car => car.id === id);

    if (!car) throw new NotFoundException(`Car #${id} not found`);

    return car;
  }

  create(createCarDto: CreateCarDto) {
    console.log(createCarDto);

    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(car);
    return {
      message: 'Car Created',
      car: createCarDto,
    };
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOne(id);

    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new BadRequestException(`Car #${id} not found`);
    }

    this.cars = this.cars.map(car => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto,
          id,
        };
        return carDB;
      }
      return car;
    });

    return {
      msg: 'Car Updated',
      car: carDB,
    };
  }

  delete(id: string) {
    this.findOne(id);
    this.cars = this.cars.filter(car => car.id !== car.id);
  }
}
