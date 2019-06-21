<template>
    <div style="position: relative">
      <div>
      <h2  style="float: left; margin-left: 4%;">主窗字段</h2>
      <h2  style="float: right; margin-right: 4%">弹窗字段</h2>
      </div>
  <div  id="diagramContainer" style="margin: auto;position: relative; height: 600px; overflow: auto;" >
    <div style="position: absolute; left: 10px; ">
      <div v-for="(e, index) in source" :key="index" class="item" :id="e+ 'source'" >{{e}}</div>
    </div>
    <div style="position: absolute; right: 10px; ">
      <div  v-for="(e, index) in target" :key="index" class="item" :id="e + 'target'" >{{e}}</div>
    </div>
  </div>
      <div class="footer" style="text-align: right; margin-top: 10px">
        <slot name="action">
          <el-button type="primary" size="small" @click="close">取消</el-button>
          <el-button type="primary" size="small" @click="sub">确定</el-button>
        </slot>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { jsPlumb } from 'jsplumb'
export default {
  name: 'ConnectionLine',
  props: {
    source: Array,
    target: Array,
    type: Number
  },
  methods: {
    ...mapActions(['updateShowConnectionLineAction', 'updateLineAction']),
    close () {
      this.updateShowConnectionLineAction(false)
    },
    sub () {
      let set = new Set()
      let temp = ''
      let connections = jsPlumb.getAllConnections()
      for (let i = 0; i < connections.length; i++) {
        set.add(document.getElementById(connections[i].sourceId).innerText + '=' + document.getElementById(connections[i].targetId).innerText)
      }
      set.forEach((e) => {
        temp = temp + e + ','
      })
      temp = temp.substring(0, temp.length - 1)
      this.updateLineAction(temp)
      this.close()
    },
    draw () {
      let s = this.currentLineStr.split(',')
      for (let i = 0; i < s.length; i++) {
        let a = s[i].split('=')
        // jsPlumb.connect({
        //   source: jsPlumb.getEndpoint('item_left' + a[0]),
        //   target: jsPlumb.getEndpoint('item_right' + a[1])
        // })
        let uuidsource = a[0] + 'source'
        let uuidtarget = a[1] + 'target'
        jsPlumb.connect({
          uuids: [uuidsource, uuidtarget]
        })
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      let that = this
      jsPlumb.reset()
      console.log(jsPlumb)
      jsPlumb.importDefaults({
        ConnectionsDetachable: false
      })
      const commonTarget = {
        isTarget: true,
        endpointStyle: { fill: 'black', outlineStroke: 'black' },
        endpoint: ['Dot', { radius: 5 }],
        maxConnections: -1,
        connectorOverlays: [['PlainArrow', {
          width: 12,
          length: 12,
          color: 'silver',
          fill: 'silver',
          borderStyle: '2px'
        }]]
      }
      const commonSource = {
        isSource: true,
        connector: ['Bezier', { lineWidth: 10 }],
        maxConnections: that.type === 0 ? 1 : -1,
        endpoint: ['Dot', { radius: 5 }],
        paintStyle: {
          fill: 'black',
          outlineStroke: 'black',
          strokeWidth: 1
        },
        hoverPaintStyle: {
          outlineStroke: 'lightblue'
        },
        connectorStyle: {
          outlineStroke: 'silver',
          strokeWidth: 3
        },
        connectorHoverStyle: {
          strokeWidth: 2,
          outlineStroke: 'red'
        },
        connectorOverlays: [['Arrow', { width: 12, length: 12 }]]
      }
      jsPlumb.ready(function () {
        jsPlumb.setContainer('diagramContainer')
        // 初始化源端点
        for (let i = 0; i < that.source.length; i++) {
          let endSourcePointName = that.source[i] + 'source'
          jsPlumb.addEndpoint(endSourcePointName, {
            anchors: ['Right'],
            uuid: endSourcePointName
          }, commonSource)
        }
        for (let j = 0; j < that.target.length; j++) {
          let endTargetPointName = that.target[j] + 'target'
          jsPlumb.addEndpoint(endTargetPointName, {
            anchors: ['Left'],
            uuid: endTargetPointName
          }, commonTarget)
        }
        if (that.currentLineStr.length > 0) {
          that.draw()
        }
      }
      )
      jsPlumb.bind('connection', function (info, originalEvent) {
        console.log(info, originalEvent)
      })
      jsPlumb.bind('dblclick', function (conn) {
        jsPlumb.deleteConnection(conn)
      })
    })
  },
  computed: {
    ...mapState(['showConnectionLine', 'currentLineStr'])
  }
}
</script>

<style scoped>
  .item {
    width:130px;
    height: 30px;
    border: 1px black solid;
  }
  ul {
    list-style: none;
    height: 200px;
    float: left;
    overflow: scroll;
  }
</style>
