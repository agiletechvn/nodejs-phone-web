import { PhoneInterface } from './Phone';
import { PhoneController } from './services';

const Controller = new PhoneController();

describe('Add new item', () => {
    const newPhoneModel: PhoneInterface = {
        name: 'IPhone 11',
        manufacturer: 'Apple',
        description: 'Expensive Smart Phone',
        color: 'Space Gray',
        price: 1000,
        screen: 'Liquid Retina HD display',
        processor: 'A13',
        ram: '4GB',
        imageFile: undefined,
    }

    let phone: any;

    it('should create phone successfully', async () => {
        phone = await Controller.createPhone(newPhoneModel);
        console.log('result', phone);
        expect(phone).toHaveProperty('id');
    })

    // it('should update phone', async () => {
    //     phone.name = 'Iphone 12';
    //     phone = await Controller.updatePhone(phone, phone.id);
        
    //     const newName = phone.name;
    //     expect(newName).toBe('Iphone 12');
    // })

    // it('should delete phone', async () => {
    //     const result = await Controller.deletePhone(phone.id);
    //     expect(result).toBe('success');
    // })
})