export function getRandomItem<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}


export async function getRandomItemByInteger(integer:number):Promise<number>{
    const randomIndex = Math.floor(Math.random() * integer);
    return randomIndex;
}