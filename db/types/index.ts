export interface IDriver {
    id?: number
    name: string
    password: string
    profile_photo?: string
    created_at?: string
    updated_at?: string
}

export interface ISafeDriver {
    id?: number
    name: string
    profile_photo?: string
    created_at?: string
    updated_at?: string
}

export interface ICar {
    id?: number
    driver_id: number
    brand: string
    model: string
    plate: string
    fuel_type: string
    fuel_consumption: string
    profile_photo: string
    created_at?: string
    updated_at?: string
}
export interface IServiceReposponse<T> {
    success: boolean
    data?: T
    errorMessage?: string
    successMessage?: string
}

export interface IShift {
    id?: number
    driver_id: number
    car_id: number
    total_time: number
    total_km: number
    total_earnings: number
    total_expenses: number
    earnings_per_hour?: number
    earnings_per_km?: number
    net_earnings?: number
    created_at?: string
}
