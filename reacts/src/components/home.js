import React from 'react'
import './home.css'

export default function Home(props) {
  const margin_limit_list = [
    {
      'lever_rate': 2,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '3000.000000000000000000',
          'min_margin_available': '0E-18',
          'max_margin_available': '3000.000000000000000000'
        },
        {
          'min_margin_balance': '3000.000000000000000000',
          'max_margin_balance': '4000.000000000000000000',
          'min_margin_available': '3000.000000000000000000',
          'max_margin_available': '3800.000000000000000000'
        },
        {
          'min_margin_balance': '4000.000000000000000000',
          'max_margin_balance': '5000.000000000000000000',
          'min_margin_available': '3800.000000000000000000',
          'max_margin_available': '4371.428571428571428571'
        },
        {
          'min_margin_balance': '5000.000000000000000000',
          'max_margin_balance': '7000.000000000000000000',
          'min_margin_available': '4371.428571428571428571',
          'max_margin_available': '5371.428571428571428571'
        },
        {
          'min_margin_balance': '7000.000000000000000000',
          'max_margin_balance': '~',
          'min_margin_available': '5371.428571428571428571',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 3,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 5,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 8,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 10,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 12,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 15,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 20,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 30,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 50,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 75,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 100,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 125,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 150,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 160,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 170,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    },
    {
      'lever_rate': 175,
      'symbol': 'BTC',
      'ladders': [
        {
          'min_margin_balance': '0E-18',
          'max_margin_balance': '~',
          'min_margin_available': '0E-18',
          'max_margin_available': '~'
        }
      ]
    }
  ]
  
  const res = margin_limit_list.reduce((memo, current, index) => {
    // 查找对应的品种
    const findIndex = memo.findIndex(item => item.symbol === current.symbol)
    if (findIndex > -1) { // 如果已经存在，找到对应的地方插值
      memo[findIndex].children.push({
        lever_rate: current.lever_rate,
        ladders: current.ladders
      })
    } else { // 不存在新建并插值
      memo.push({
        symbol: current.symbol,
        children: [
          { lever_rate: current.lever_rate, ladders: current.ladders }
        ]
      })
    }
    return memo
  }, [])

  function getSymbolRowspan(symbol) {
    const a = symbol.children.reduce((memo, current) => {
      memo += current.ladders.length
      return memo
    }, 0)
    return a
  }

  function getRateRowspan(item) {
    return item.ladders.length
  }
  
  return (
    <table>
      <thead>
        <tr>
          <th>品种</th>
          <th>杠杆</th>
          <th>账户权益</th>
          <th>可用保证金范围</th>
        </tr>
      </thead>
      <tbody>
        {
          res.map((item, index) => {
            return item.children.map((child, idx) => {
              return child.ladders.map((ladder, i) => {
                return (
                  <tr key={index + '' + idx + '' + i}>
                    {
                      idx === 0 && i === 0 && <td rowSpan={getSymbolRowspan(item)}>{ item.symbol }</td>
                    }
                    {
                      i === 0 && <td rowSpan={getRateRowspan(child)}>{ child.lever_rate }</td>
                    }
                    <td>{ladder.min_margin_balance}</td>
                    <td>{ladder.min_margin_available}</td>
                  </tr>
                )
              })
              })
          })
        }
      </tbody>
    </table>
  )
}