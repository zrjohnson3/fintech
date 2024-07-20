import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from './mmkv-storage';

export interface Transaction {
    id: number
    amount: number
    date: Date;
    title: string
    description?: string
    type?: 'credit' | 'debit' | 'transfer' | 'payment' | 'withdrawal' | 'deposit' | 'crypto'
}

export interface BalanceState {
    transactions: Array<Transaction>
    runTransaction: (transaction: Transaction) => void
    balance: () => number
    clearTransactions: () => void
}

// Create a store for the balance state that persists the transactions by using the zustandStorage created in mmkv-storage.ts
export const useBalanceStore = create<BalanceState>()(
    persist((set, get) => ({
        // Initialize the transactions array
        transactions: [],
        // Add a transaction to the transactions array
        runTransaction: (transaction) => {
            set((state) => ({
                transactions: [...state.transactions, transaction]
            }))
        },
        // Calculate the balance by summing the amounts of the transactions
        balance: () => {
            return get().transactions.reduce((acc, transaction) => {
                if (transaction.type === 'credit' || transaction.type === 'deposit') {
                    return acc + transaction.amount
                } else if (transaction.type === 'debit' || transaction.type === 'withdrawal') {
                    return acc - transaction.amount
                }
                return acc
            }, 0)
        },
        // Clear the transactions array
        clearTransactions: () => {
            set({ transactions: [] })
        }
    }), {
        // Set the name of the store
        name: 'balance',
        // Use the zustandStorage created in mmkv-storage.ts
        storage: createJSONStorage(() => zustandStorage),
    })
)